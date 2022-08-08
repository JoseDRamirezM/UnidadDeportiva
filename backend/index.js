const express = require('express');
const oracledb = require('oracledb');
const app = express();

app.use(express.json());

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
    P.IDHORA HORAINICIO, P.HOR_IDHORA HORAFIN, D.NOMDIA
FROM ESPACIO E, TIPOESPACIO TE,
    DEPORTE D, PROGRAMACION P,
    EMPLEADO_CARGO EC, EMPLEADO DOC, DIA D, CARGO C
WHERE P.IDDEPORTE = D.IDDEPORTE
    AND P.CODESPACIO = E.CODESPACIO
    AND E.CODESPACIO = EC.CODESPACIO
    AND EC.CODEMPLEADO = DOC.CODEMPLEADO
    AND P.IDDIA = D.IDDIA
    AND EC.IDCARGO = C.IDCARGO
    AND LOWER(C.DESCARGO) LIKE 'docente%'
    AND E.IDTIPOESPACIO = TE.IDTIPOESPACIO
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

// const consulta_auxiliar = `SELECT * FROM EMPLEADO`;

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
            IDS: body.IDS,
        };
        /**
         * Formar la cadena para el filtro LIKE de la consulta
         * nombre&apellido
         */
        console.log(data.IDS);
        res.send({});

        // conn = await oracledb.getConnection(conn_data);
        // result = await conn.execute(
        //     consulta_elementos_docente,
        //     [data.DEPORTE, data.SEDE],
        //     result_format
        // );
        // const rs = result.resultSet;
        // let rows;
        // do {
        //     rows = await rs.getRows(100);
        //     console.log(rows.length);
        //     console.log(rows);
        // } while (rows.length === 100);
        // res.send(rows);
        // await rs.close();
    } catch (error) {
        console.log(error);
    }
    // } finally {
    //     if (conn) {
    //         try {
    //             //await conn.close();
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // }
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
