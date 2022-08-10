import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Componente que se encarga de la funcionalidad de la
 * asistencia de los miembros de los equipos
 * @param {*} props
 * @returns
 */

const AsistenciaMiembroEquipo = (props) => {
    return (
        <div>
            <Container spacing={2} justify="center">
                <h2>Registro asistencia miembros de equipos</h2>
                {/* Formulario para ingresar el código del estudiante
                y el equipo al que pertenece
                */}
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
                    <Form.Label>Equipo</Form.Label>
                    <Form.Select
                        value={1}
                        onChange={props.handleCodEquipo}
                        aria-label="Default select example"
                    >
                        {props.equipos.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Label>Simulación fecha</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={props.fechaCurso}
                        onChange={props.handleFechaCurso}
                    />
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </Container>
        </div>
    );
};
export default AsistenciaMiembroEquipo;
