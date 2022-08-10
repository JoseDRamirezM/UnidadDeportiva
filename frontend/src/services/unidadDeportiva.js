import axios from 'axios';
const baseUrl = '/api';

const login = (codempleado) => {
    const request = axios.post(baseUrl + '/login', codempleado);
    return request.then((response) => {
        console.log(response.data);
        return response.data;
    });
};

const consulta_docente = (info_docente) => {
    const request = axios.post(baseUrl + '/docente', info_docente);
    return request.then((response) => {
        console.log(response.data, 'docente');
        return response.data;
    });
};

const consulta_elementos_docente = (deporte_sede) => {
    const request = axios.post(baseUrl + '/docente/elementos', deporte_sede);
    return request.then((response) => {
        console.log(response.data, 'elementos para docente');
        return response.data;
    });
};

const consulta_prestar_elementos = (elementos) => {
    const request = axios.post(
        baseUrl + '/docente/elementos/prestar',
        elementos
    );
    return request.then((response) => {
        console.log(response.data, 'prestados docente');
        return response.data;
    });
};

const consulta_miembro_equipo = (data) => {
    const request = axios.post(baseUrl + '/miembroEquipo/asistencia', data);
    return request.then((response) => {
        console.log(response.data, 'asistencia miembro');
        return response.data;
    });
};

const generar_reporte_equipos = (data) => {
    const request = axios.post(baseUrl + '/reportes/miembrosEquipo', data);
    return request.then((response) => {
        console.log(response.data, 'asistencia miembro');
        return response.data;
    });
};

// eslint-disable-next-line
export default {
    login,
    consulta_docente,
    consulta_elementos_docente,
    consulta_prestar_elementos,
    consulta_miembro_equipo,
    generar_reporte_equipos,
};
