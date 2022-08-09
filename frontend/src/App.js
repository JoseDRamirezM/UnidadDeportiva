import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import React, { useState, useEffect } from 'react';
import AsistenciaDocente from './components/AsistenciaDocente';
import AsistenciaMiembroEquipo from './components/AsistenciaMiembroEquipo';
import AsistenciaPasante from './components/AsistenciaPasante';
import Principal from './components/Principal';
import unidadDeportivaService from './services/unidadDeportiva';

const App = () => {
    /**################# GENERAL ###########################*/
    const [fechaHora, setFechaHora] = useState();
    /**################################################################*/

    /**################# LOGIN ###########################*/
    /**Estado del form de login */
    const [codEmpleado, setCodEmpleado] = useState('');
    /** Variable que controla si el usuario está autorizado o no */
    const [autorizado, setAutorizado] = useState(false);

    /** Variable que almacena el objeto del auxiliar */
    //    const [auxiliar, setAuxiliar] = useState([]);

    // Manejo de el campo del login
    const handleCodEmpleado = (event) => {
        setCodEmpleado(event.target.value);
    };

    // Manejo del login
    const handleLogin = async (event) => {
        event.preventDefault();
        if (codEmpleado) {
            const usuario = {
                CODEMPLEADO: codEmpleado,
            };
            await unidadDeportivaService.login(usuario).then((resultado) => {
                if (resultado) {
                    console.log(resultado);
                    setAutorizado(resultado);
                }
            });
            console.log(codEmpleado);
        }
    };
    /**################################################################*/

    /**################# ASISTENCIA DOCENTE ###########################*/
    const [nombreDocente, setNombreDocente] = useState('');
    const [apellidoDocente, setApellidoDocente] = useState('');
    const [fechaCurso, setFechaCurso] = useState('');

    /** Variable que almacena el resultado de la consulta de
     * la asistencia del docente
     * curso, espacio, deporte, número de estudiantes
     */
    const [infoCurso, setInfoCurso] = useState([]);

    /** Variable que almacena los elementos disponibles para prestamo */
    const [elementosPrestarDocente, setElementosPestarDocente] = useState([]);

    const [elementosSeleccionados, setElementosSeleccionados] = useState([]);

    const handleNombreDocente = (event) => {
        setNombreDocente(event.target.value);
    };

    const handleApellidoDocente = (event) => {
        setApellidoDocente(event.target.value);
    };

    const handleFechaCurso = (event) => {
        setFechaCurso(event.target.value);
        console.log(fechaCurso);
    };

    const handleSeleccionarElemento = (id) => {
        if (!elementosSeleccionados.includes(id)) {
            setElementosSeleccionados([...elementosSeleccionados, id]);
        } else {
            const index = elementosSeleccionados.indexOf(id);
            console.log(index);
            if (index > -1) {
                // only splice array when item is found
                setElementosSeleccionados(
                    elementosSeleccionados.filter((_, i) => i !== index)
                );
            }
        }
        console.log(elementosSeleccionados);
    };

    const intDiaSemana = (numeroDia) => {
        switch (numeroDia) {
            case 0:
                return 'DOMINGO';
            case 1:
                return 'LUNES';
            case 2:
                return 'MARTES';
            case 3:
                return 'MIERCOLES';
            case 4:
                return 'JUEVES';
            case 5:
                return 'VIERNES';
            case 6:
                return 'SABADO';
            default:
                return 'NAN';
        }
    };

    /**
     * Esta función se encarga de consultar en la base de datos si hay un curso asignado
     * para determinado docente en la hora y día especificados
     * @param {} event
     */

    const handleAsistenciaDocente = (event) => {
        event.preventDefault();
        // Obtener el día de la semana a partir de la fecha
        const diaSemana = intDiaSemana(new Date(fechaCurso).getDay());
        // Obtener la hora de la cadena quoe contiene FECHA-HORA
        const hora = fechaCurso.split('T')[1];
        // Verificar que los campos no estén vacíos
        if (nombreDocente && apellidoDocente && fechaCurso) {
            // Objeto que tiene los datos necesarios para la consulta
            // del curso del docente
            const consulta_docente = {
                NOMEMPLEADO: nombreDocente,
                APELLEMPLEADO: apellidoDocente,
                DIA: diaSemana,
                SEDE: autorizado[0].SEDE,
                HORA: hora,
            };
            console.log(consulta_docente);
            // Llamar al manejador de la comunicación con el backend
            // para que realice la consulta
            unidadDeportivaService
                .consulta_docente(consulta_docente)
                .then((curso_ahora) => {
                    setInfoCurso(curso_ahora);
                    console.log(curso_ahora, 'del backend');
                })
                .catch((error) => console.log(error.message));

            // Objeto que contiene los datos necesarios
            // para consultar los elementos disponibles para
            // préstamo

            // Limpiar datos del formulario
            setNombreDocente('');
            setApellidoDocente('');
        }
    };

    const handleConsultarElementosDocente = (event) => {
        event.preventDefault();
        const consulta_elementos = {
            SEDE: autorizado[0].SEDE,
            DEPORTE: infoCurso[0].DEPORTE,
        };
        console.log(consulta_elementos);
        unidadDeportivaService
            .consulta_elementos_docente(consulta_elementos)
            .then((disponibles) => {
                setElementosPestarDocente(disponibles);
                console.log(disponibles, 'elementos del backend');
            })
            .catch((error) => console.log(error.message));
    };

    const handlePrestarElementos = (event) => {
        event.preventDefault();
        console.log(elementosSeleccionados);
        let elemento = {};
        let elementos = [];
        for (let i in elementosSeleccionados) {
            elemento.id = elementosSeleccionados[i];
            elementos.push({ ...elemento });
        }
        console.log(fechaCurso);
        let data = {
            CONSECPROGRA: infoCurso[0].COD,
            CODEMPLEADO: infoCurso[0].CODEMPLEADO,
            FECHAHORA: fechaCurso,
            IDS: elementos,
        };

        console.log(elementos);
        console.log(data);

        const res = elementosPrestarDocente.filter((item) => {
            return elementosSeleccionados.indexOf(item.ID) === -1;
        });

        setElementosPestarDocente(res);
        console.log(elementosPrestarDocente);

        setElementosSeleccionados([]);
        unidadDeportivaService
            .consulta_prestar_elementos(data)
            .then((disponibles) => {
                console.log(disponibles, 'elementos del backend');
            })
            .catch((error) => console.log(error.message));

        alert('Exito en el proceso de prestamo');
    };

    /**################################################################*/

    /**################# ASISTENCIA MIEMBRO EQUIPO ###########################*/
    const [codEstudiante, setCodEstudiante] = useState('');

    const handleCodEstudiante = (event) => {
        setCodEstudiante(event.target.value);
    };

    const handleAsistenciaEstudiante = async (event) => {
        event.preventDefault();
        if (codEstudiante) {
            console.log(codEstudiante);
        }
    };
    /**#######################################################################*/

    /**################# HOOKS PARA DATOS ###########################*/

    // Hook para actualzar fecha y hora
    useEffect(() => {
        const timer = setInterval(() => {
            setFechaHora(new Date().toLocaleString());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    });

    /**################################################################*/

    // Funcion que presenta la interfaz
    const renderAutorizado = () => {
        return (
            <div>
                <Router>
                    <div className="App">
                        {/* Barra de navegación */}
                        <Navbar bg="dark" variant="dark">
                            <Container>
                                <Navbar.Brand as={Link} to="/">
                                    Unidad deportiva
                                </Navbar.Brand>
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/AsistenciaDocente">
                                        Asistencia Docente
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/AsistenciaMiembroEquipo"
                                    >
                                        Asistencia Miembro Equipo
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/AsistenciaPasante">
                                        Asistencia Pasante
                                    </Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                        <br />
                    </div>

                    {/* Se definen las rutas a las que el usuario tiene acceso y el componente
                    que maneja esa funcionalidad, tener en cuenta que se verifica que el usuario
                    esté autorizado para mostrar el componente de lo contrario redirecciona al login */}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Principal
                                    autorizado={autorizado}
                                    fechaHora={fechaHora}
                                />
                            }
                        />
                        <Route
                            path="/AsistenciaDocente"
                            element={
                                autorizado ? (
                                    <AsistenciaDocente
                                        autorizado={autorizado}
                                        nombreDocente={nombreDocente}
                                        apellidoDocente={apellidoDocente}
                                        fechaCurso={fechaCurso}
                                        handleNombreDocente={
                                            handleNombreDocente
                                        }
                                        handleApellidoDocente={
                                            handleApellidoDocente
                                        }
                                        handleFechaCurso={handleFechaCurso}
                                        handleAsistenciaDocente={
                                            handleAsistenciaDocente
                                        }
                                        infoCurso={infoCurso}
                                        elementosPrestarDocente={
                                            elementosPrestarDocente
                                        }
                                        handleConsultarElementosDocente={
                                            handleConsultarElementosDocente
                                        }
                                        elementosSeleccionados={
                                            elementosSeleccionados
                                        }
                                        handleSeleccionarElemento={
                                            handleSeleccionarElemento
                                        }
                                        handlePrestarElementos={
                                            handlePrestarElementos
                                        }
                                    />
                                ) : (
                                    <Navigate replace to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/AsistenciaMiembroEquipo"
                            element={
                                autorizado ? (
                                    <AsistenciaMiembroEquipo
                                        autorizado={autorizado}
                                        codEstudiante={codEstudiante}
                                        handleCodEstudiante={
                                            handleCodEstudiante
                                        }
                                        handleAsistenciaEstudiante={
                                            handleAsistenciaEstudiante
                                        }
                                    />
                                ) : (
                                    <Navigate replace to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/AsistenciaPasante"
                            element={
                                autorizado ? (
                                    <AsistenciaPasante
                                        autorizado={autorizado}
                                    />
                                ) : (
                                    <Navigate replace to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <Login
                                    handleLogin={handleLogin}
                                    codEmpleado={codEmpleado}
                                    handleCodEmpleado={handleCodEmpleado}
                                />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        );
    };

    return <div>{renderAutorizado()}</div>;
};

export default App;
