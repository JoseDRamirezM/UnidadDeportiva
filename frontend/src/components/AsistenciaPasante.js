import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Componente que se encarga de la funcionalidad de la
 * asistencia de los pasantes
 * @param {*} props
 * @returns
 */

const AsistenciaPasante = (props) => {
    return (
        <div>
            <Container spacing={2} justify="center">
                <h2>Registro asistencia estudiantes</h2>
                {/* Formulario para ingresar el código de empleado */}
                <Form onSubmit={props.handleAsistenciaEstudiante}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Código estudiante</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Código estudiante"
                            value={props.codEstudiante}
                            onChange={props.handleCodEstudiante}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </Container>
        </div>
    );
};
export default AsistenciaPasante;
