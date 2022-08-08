import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

/**
 * Componente que se encarga de la funcionalidad de la
 * asistencia de los docentes
 * @param {*} props
 * @returns
 */

const AsistenciaDocente = (props) => {
    let curso = null;
    if (props.infoCurso) {
        curso = props.infoCurso[0];
    }
    let elementos = null;
    if (props.elementosPrestarDocente) {
        elementos = props.elementosPrestarDocente[0];
    }
    return (
        <div>
            <div>
                <Container spacing={2} justify="center">
                    <h2>Registro asistencia docentes</h2>
                    {/* Formulario para ingresar el código de empleado */}
                    <Form onSubmit={props.handleAsistenciaDocente}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre Docente</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre Docente"
                                value={props.nombreDocente}
                                onChange={props.handleNombreDocente}
                            />
                            <Form.Label>Apellido Docente</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apellido Docente"
                                value={props.apellidoDocente}
                                onChange={props.handleApellidoDocente}
                            />
                            <Form.Label>Simulación fecha</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={props.fechaCurso}
                                onChange={props.handleFechaCurso}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Buscar
                        </Button>
                    </Form>
                </Container>
            </div>
            {curso && (
                <Container spacing={2} justify="center">
                    <hr />
                    <h2>Elementos disponibles</h2>
                    <Card style={{ width: '50rem' }}>
                        <Card.Body>
                            <Card.Title>{curso.DEPORTE}</Card.Title>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Día</th>
                                        <th>Hora inicio</th>
                                        <th>Hora fin</th>
                                        <th>Sede</th>
                                        <th>Docente</th>
                                        <th>Inscritos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{curso.NOMDIA}</td>
                                        <td>{curso.HORAINICIO}</td>
                                        <td>{curso.HORAFIN}</td>
                                        <td>{curso.ESPACIO}</td>
                                        <td>{curso.DOCENTE}</td>
                                        <td>{curso.INSCRITOS}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Card.Text>
                                Actividad asignada para hoy a esta hora
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Form onSubmit={props.handleConsultarElementosDocente}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                value={curso.DEPORTE}
                                hidden
                                readOnly
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Buscar elementos disponibles
                        </Button>
                    </Form>
                </Container>
            )}
            {elementos && (
                <Container spacing={2} justify="center">
                    <hr />
                    <h2>Elementos disponibles</h2>
                    <Card style={{ width: '30rem' }}>
                        <Card.Body>
                            <Card.Title>{curso.DEPORTE}</Card.Title>
                            <Form onSubmit={props.handlePrestarElementos}>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Prestar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.elementosPrestarDocente.map(
                                            (elemento) => (
                                                <tr key={elemento.ID}>
                                                    <td>{elemento.TIPO}</td>
                                                    <td>
                                                        <input
                                                            value={elemento.ID}
                                                            type="checkbox"
                                                            onChange={() =>
                                                                props.handleSeleccionarElemento(
                                                                    elemento.ID
                                                                )
                                                            }
                                                        ></input>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                                <Button variant="primary" type="submit">
                                    Prestar elementos
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            )}
        </div>
    );
};
export default AsistenciaDocente;
