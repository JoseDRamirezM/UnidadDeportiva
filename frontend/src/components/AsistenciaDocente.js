import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Componente que se encarga de la funcionalidad de la
 * asistencia de los docentes
 * @param {*} props
 * @returns
 */

const AsistenciaDocente = (props) => {
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
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    );
};
export default AsistenciaDocente;
