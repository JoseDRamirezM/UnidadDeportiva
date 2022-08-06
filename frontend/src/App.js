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
    const [auxiliar, setAuxiliar] = useState([]);

    // Manejo de el campo del login
    const handleCodEmpleado = (event) => {
        setCodEmpleado(event.target.value);
    };

    // Manejo del login
    const handleLogin = async (event) => {
        event.preventDefault();
        if (codEmpleado) {
            console.log(codEmpleado);
            await setAutorizado(true);
        }
    };
    /**################################################################*/

    /**################# ASISTENCIA DOCENTE ###########################*/
    const [nombreDocente, setNombreDocente] = useState('');
    const [apellidoDocente, setApellidoDocente] = useState('');

    /** Variable que almacena el resultado de la consulta de
     * la asistencia del docente
     * curso, espacio, deporte, número de estudiantes
     */
    const [infoCurso, setInfoCurso] = useState([]);

    const handleNombreDocente = (event) => {
        setNombreDocente(event.target.value);
    };

    const handleApellidoDocente = (event) => {
        setApellidoDocente(event.target.value);
    };

    const handleAsistenciaDocente = async (event) => {
        event.preventDefault();
        if (nombreDocente && apellidoDocente) {
            console.log(nombreDocente, apellidoDocente);
        }
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
                                        handleNombreDocente={
                                            handleNombreDocente
                                        }
                                        handleApellidoDocente={
                                            handleApellidoDocente
                                        }
                                        handleAsistenciaDocente={
                                            handleAsistenciaDocente
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
