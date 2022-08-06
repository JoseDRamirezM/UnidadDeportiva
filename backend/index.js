const express = require('express');
const oracledb = require('oracledb');
const app = express();

app.use(express.json());

/** Datos de conexión */
const conn_data = {
    user: 'jodramirezm',
    password: 'jodramirezm',
    connectionString: 'localhost',
};

const result_format = {
    resultSet: true,
    outFormat: oracledb.OUT_FORMAT_OBJECT,
};

/**
 * Función que se encarga de determinar si el código de usuario
 * es válido y el tipo de usuario que es
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
    const id = req.params.id;
    conn = await oracledb.getConnection(conn_data);
    result = await conn.execute(``, [], result_format);
};

app.get('/api/login', async (request, response) => {
    getPorId(request, response);
});

app.get('/api/auxiliar/:id', async (request, response) => {
    getPorId(request, response);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
