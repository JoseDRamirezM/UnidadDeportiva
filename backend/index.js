const express = require('express');
const oracledb = require('oracledb');
const app = express();

app.use(express.json());

/** Constantes de cargos de empleados */
const DIRECTOR_DEPORTIVO = '1';
const DOCENTE = '2';
const ENTRENADOR = '3';

/** Consecutivos que se acumulan para
 * insertar en las tablas correspondientes
 */
let CONSECRES = 0;
let CONSECASISRES = 0;
let CONSECPRESTAMO = 0;

/** Constantes del estado de los elementos */
const ACTIVO = '1';
const PRESTADO = '2';

/** Datos de conexión */
const conn_data = {
    user: 'deportiva',
    password: 'deportiva',
    connectionString: 'localhost',
};

const result_format = {
    resultSet: true,
    outFormat: oracledb.OUT_FORMAT_OBJECT,
};

/**
 * CONSULTA PARA DETERMINAR SI EL CÓDIGO CORRESPONDE A UN AUXILIAR
 */
const consulta_auxiliar = `
SELECT * FROM
(
    SELECT DISTINCT A.CODEMPLEADO CODIGO, A.NOMEMPLEADO||' '||A.APELLEMPLEADO NOMBRE,
        C.DESCARGO CARGO, E.NOMESPACIO SEDE, EA.FECHACARGO
    FROM EMPLEADO A, EMPLEADO_CARGO EA, CARGO C, ESPACIO E, TIPOESPACIO TE
    WHERE A.CODEMPLEADO = EA.CODEMPLEADO AND
        EA.IDCARGO = C.IDCARGO AND EA.CODESPACIO = E.CODESPACIO
        AND E.IDTIPOESPACIO = TE.IDTIPOESPACIO
        AND LOWER(TE.DESCTIPOESPACIO) LIKE 'sede%'
        AND (LOWER(C.DESCARGO) LIKE 'auxiliar%'
        OR LOWER(C.DESCARGO) LIKE 'director%deportivo')
        AND EA.FECHAFINCAR IS NULL
        AND A.CODEMPLEADO = :id
    ORDER BY EA.FECHACARGO
) WHERE ROWNUM = 1`;

/**
 * Funcion que consulta si en el momento de la consulta
 * día y hora, hay un curso para un docente en específico
 */
const consulta_curso_docente = `
SELECT P.CONSECPROGRA COD, E.NOMESPACIO ESPACIO, 
    D.NOMDEPORTE DEPORTE, P.NOINSCRITO INSCRITOS,
    DOC.NOMEMPLEADO||' '||DOC.APELLEMPLEADO DOCENTE,
    DOC.CODEMPLEADO CODEMPLEADO,
    P.IDHORA HORAINICIO, P.HOR_IDHORA HORAFIN, D.NOMDIA
FROM ESPACIO E, TIPOESPACIO TE,
    DEPORTE D, PROGRAMACION P,
    ACTIVIDAD A,
    EMPLEADO_CARGO EC, EMPLEADO DOC, DIA D, CARGO C
WHERE P.IDDEPORTE = D.IDDEPORTE
    AND P.CODESPACIO = E.CODESPACIO
    AND E.CODESPACIO = EC.CODESPACIO
    AND EC.CODEMPLEADO = DOC.CODEMPLEADO
    AND P.IDACTIVIDAD = A.IDACTIVIDAD
    AND LOWER(P.IDACTIVIDAD) LIKE 'cu'
    AND P.IDDIA = D.IDDIA
    AND EC.IDCARGO = C.IDCARGO
    AND E.IDTIPOESPACIO = TE.IDTIPOESPACIO
    AND LOWER(C.DESCARGO) LIKE 'docente%'
    AND LOWER(E.NOMESPACIO) LIKE :sede
    AND (LOWER(DOC.NOMEMPLEADO||' '||DOC.APELLEMPLEADO))
    LIKE :nomempleado
    AND LOWER(D.NOMDIA) LIKE :dia`;

const consulta_elementos_docente = `
SELECT ED.CONSECELEMENTO ID, TE.DESCTIPOELEMENTO TIPO, 
    E.DESCESTADO ESTADO, D.NOMDEPORTE DEPORTE, ES.NOMESPACIO ESPACIO
FROM ELEMENDEPORTIVO ED, ESTADO E, TIPOELEMENTO TE, 
    DEPORTE D, TIEL_DEP TID, ESP_DEP ESD, ESPACIO ES
WHERE ED.IDESTADO = E.IDESTADO 
    AND ED.IDTIPOELEMENTO = TE.IDTIPOELEMENTO
    AND TE.IDTIPOELEMENTO = TID.IDTIPOELEMENTO
    AND TID.IDDEPORTE = D.IDDEPORTE
    AND D.IDDEPORTE = ESD.IDDEPORTE
    AND ESD.CODESPACIO = ES.CODESPACIO
    AND LOWER(E.DESCESTADO) LIKE 'activo'
    AND LOWER(D.NOMDEPORTE) LIKE :deporte
    AND LOWER(ES.NOMESPACIO) LIKE :sede`;

const insertar_responsable = `
INSERT INTO RESPONSABLE
    (CONSECPROGRA, CONSECRES, CODEMPLEADO, CODESTU,
        IDROL,FECHAINI,FECHAFIN
    )
VALUES 
    (:CONSECPROGRA, :CONSECRES, :CODEMPLEADO, :CODESTU,
        :IDROL,TO_DATE(:FECHAINI, 'yyyy-mm-dd'),
        TO_DATE(:FECHAFIN, 'yyyy-mm-dd')
    )
`;

const insertar_asistir_responsable = `
INSERT INTO ASISTIRRESPONSABLE
    (CONSECPROGRA, CONSECRES, CONSECASISRES,
        FECHAASISRES, HORAASISRES
    )
VALUES 
    (:CONSECPROGRA, :CONSECRES, :CONSECASISRES,
        TO_DATE(:FECHAASISRES, 'yyyy-mm-dd'),
        TO_DATE(:HORAASISRES, 'yyyy-mm-dd hh24:mi:ss')
    )
`;

const insertar_prestamo = `
INSERT INTO PRESTAMO
    (CONSECPRESTAMO,CONSECELEMENTO,CONSECPROGRA,
        CONSECRES,CONSECASISRES
    )
VALUES
    (:CONSECPRESTAMO,:CONSECELEMENTO,
        :CONSECPROGRA,:CONSECRES,:CONSECASISRES   
    )
`;

const actualzar_estado_elemento = `
UPDATE ELEMENDEPORTIVO
SET IDESTADO = :IDESTADO
WHERE CONSECELEMENTO = :CONSECELEMENTO
`;

/**
 * Función que se encarga de determinar si el código de usuario
 * es válido y el tipo de usuario que es
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
    try {
        const CODEMPLEADO = req.body.CODEMPLEADO;
        console.log(CODEMPLEADO);
        conn = await oracledb.getConnection(conn_data);
        result = await conn.execute(
            consulta_auxiliar,
            [CODEMPLEADO],
            result_format
        );
        const rs = result.resultSet;
        let rows;
        do {
            rows = await rs.getRows(100);
            console.log(rows.length);
            console.log(rows);
        } while (rows.length === 100);
        res.send(rows);
        await rs.close();
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error(error);
            }
        }
    }
};

/**
 * Funcion que consulta si en el momento de la consulta
 * día y hora, hay un curso para un docente en específico
 * nombre y apellido
 * @param {*} req
 * @param {*} res
 */

const consultar_cursos = async (req, res) => {
    try {
        /**
         * Obtener datos necesarios para la consulta
         */
        const body = req.body;
        const data = {
            NOMEMPLEADO: body.NOMEMPLEADO.toString().toLowerCase(),
            APELLEMPLEADO: body.APELLEMPLEADO.toString().toLowerCase(),
            DIA: body.DIA.toString().toLowerCase(),
            SEDE: body.SEDE.toString().toLowerCase(),
            HORA: body.HORA.toString(),
        };
        /**
         * Formar la cadena para el filtro LIKE de la consulta
         * nombre&apellido
         */
        const filtro_like = data.NOMEMPLEADO + '%' + data.APELLEMPLEADO;
        console.log(
            data.NOMEMPLEADO,
            data.APELLEMPLEADO,
            filtro_like,
            data.SEDE
        );
        conn = await oracledb.getConnection(conn_data);
        result = await conn.execute(
            consulta_curso_docente,
            [data.SEDE, filtro_like, data.DIA],
            result_format
        );
        const rs = result.resultSet;
        let rows;
        do {
            rows = await rs.getRows(100);
            console.log(rows.length);
            console.log(rows);
        } while (rows.length === 100);
        const ahora = parseInt(data.HORA.split(':'[0]));
        const curso_ahora = rows.filter(
            (curso) =>
                ahora >= parseInt(curso.HORAINICIO.split(':')[0]) &&
                ahora < parseInt(curso.HORAFIN.split(':')[0])
        );
        res.send(curso_ahora);
        await rs.close();
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error(error);
            }
        }
    }
};

/**
 * Funcion que consulta los elementos activos para los cursos
 * de los docentes
 * @param {*} req
 * @param {*} res
 */
const consultar_elementos_docente = async (req, res) => {
    try {
        /**
         * Obtener datos necesarios para la consulta
         */
        const body = req.body;
        const data = {
            SEDE: body.SEDE.toString().toLowerCase(),
            DEPORTE: body.DEPORTE.toString().toLowerCase(),
        };
        /**
         * Formar la cadena para el filtro LIKE de la consulta
         * nombre&apellido
         */
        console.log(data.SEDE, data.DEPORTE);
        conn = await oracledb.getConnection(conn_data);
        result = await conn.execute(
            consulta_elementos_docente,
            [data.DEPORTE, data.SEDE],
            result_format
        );
        const rs = result.resultSet;
        let rows;
        do {
            rows = await rs.getRows(100);
            console.log(rows.length);
            console.log(rows);
        } while (rows.length === 100);
        res.send(rows);
        await rs.close();
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error(error);
            }
        }
    }
};

const prestar_elementos = async (req, res) => {
    try {
        /**
         * Obtener datos necesarios para la consulta
         */
        const body = req.body;
        const data = {
            CONSECPROGRA: body.CONSECPROGRA,
            CONSECRES: CONSECRES,
            CODEMPLEADO: body.CODEMPLEADO,
            IDROL: DOCENTE,
            FECHAHORA: body.FECHAHORA,
            IDS: body.IDS,
        };
        const fecha_responsable = data.FECHAHORA.split('T')[0];
        console.log(fecha_responsable);
        /**
         * Formar la cadena para el filtro LIKE de la consulta
         * nombre&apellido
         */
        console.log(data);
        console.log(data.IDS);

        /** PARA AGREGAR REGISTRO EN ASISTIRRESPONSABLE
         * HAY QUE HACER ESTE PROCESO:
         * 1. INSERTAR REGISTRO EN RESPONSABLE
         * 2. INSERTAR REGISTRO EN ASISTIRRESPONSABLE
         * 3. INSERTAR REGISTRO EN PRESTAMO
         *
         * lUEGO COMO LOS ELEMENTOS ESTAN EN PRESTAMO
         * 1. ACTUALIZAR LOS REGISTROS DE ELEMENTOS
         * PRESTADOS EN LA TABLA ELEMENDEPORTIVO
         * EN EL ESTADO DE 'Activo' A 'Prestado'
         */

        conn = await oracledb.getConnection(conn_data);
        /**Insertar registro en tabla responsable */
        await conn.execute(insertar_responsable, {
            CONSECPROGRA: body.CONSECPROGRA,
            CONSECRES: CONSECRES,
            CODEMPLEADO: body.CODEMPLEADO,
            CODESTU: '',
            IDROL: DOCENTE,
            FECHAINI: fecha_responsable,
            FECHAFIN: fecha_responsable,
        });

        /**Insertar registro en tabla ASISTIRRESPONSABLE */
        const fecha_asistir =
            data.FECHAHORA.split('T')[0] +
            ' ' +
            data.FECHAHORA.split('T')[1] +
            ':00';
        console.log(fecha_asistir);
        await conn.execute(insertar_asistir_responsable, {
            CONSECPROGRA: body.CONSECPROGRA,
            CONSECRES: CONSECRES,
            CONSECASISRES: CONSECASISRES,
            FECHAASISRES: fecha_responsable,
            HORAASISRES: fecha_asistir,
        });

        /**Insertar en prestamo cada elemento prestado
         * y cambiar el estado en elemendeportivo
         */
        for (let i of data.IDS) {
            try {
                await conn.execute(insertar_prestamo, {
                    CONSECPRESTAMO: CONSECPRESTAMO,
                    CONSECELEMENTO: i.id,
                    CONSECPROGRA: body.CONSECPROGRA,
                    CONSECRES: CONSECRES,
                    CONSECASISRES: CONSECASISRES,
                });
                CONSECPRESTAMO += 1;
                /** Cambiar el estado de el (los)
                 * elemento(s) a prestado(s) */
                await conn.execute(actualzar_estado_elemento, {
                    IDESTADO: PRESTADO,
                    CONSECELEMENTO: i.id,
                });
            } catch (error) {
                console.log(error);
            }
        }

        CONSECASISRES += 1;
        CONSECRES += 1;

        conn.commit();
        res.send({});
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error(error);
            }
        }
    }
};

/**
 * Endpoint que se encarga de la autenticación de usuario
 */
app.post('/api/login', async (request, response) => {
    login(request, response);
});

app.post('/api/docente', async (request, response) => {
    consultar_cursos(request, response);
});

app.post('/api/docente/elementos', async (request, response) => {
    consultar_elementos_docente(request, response);
});

app.post('/api/docente/elementos/prestar', async (request, response) => {
    prestar_elementos(request, response);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
