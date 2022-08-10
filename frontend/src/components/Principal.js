import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Este componente renderiza la página principal
 * tanto para usuarios autenticados como anónimos
 * @param {*} props
 * @returns
 */

const Principal = (props) => {
    const usuario = props.autorizado[0];

    const renderEmpleado = () => {
        return (
            <div>
                <Container spacing={2} justify="center">
                    <Card style={{ width: '30rem' }}>
                        <Card.Body>
                            <Card.Title>Bienvenido</Card.Title>
                            <Card.Text>
                                Está autenticado, puede acceder a las
                                funcionalidades en la barra de navegación
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '30rem' }}>
                        <Card.Body>
                            <Card.Title>
                                Información de {usuario.CARGO}
                            </Card.Title>

                            <Card.Text>
                                <strong> Nombre: </strong>
                                {usuario.NOMBRE}
                            </Card.Text>
                            <Card.Text>
                                <strong> Sede: </strong>
                                {usuario.SEDE}
                            </Card.Text>
                            <Card.Text>
                                <strong> Cargo: </strong>
                                {usuario.CARGO}
                            </Card.Text>
                            <Card.Text>
                                <strong> Fecha: </strong>
                                {props.fechaHora}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    };
    return (
        <div>
            {/* Si el usuario está autenticado */}
            {usuario && renderEmpleado()}
            {usuario && usuario.CARGO === 'Director Deportivo' && (
                <Container spacing={2} justify="center">
                    <Card style={{ width: '30rem' }}>
                        <Card.Body>
                            <Card.Title>Descarga de reportes</Card.Title>
                            <Card.Text>
                                Click en el boton para descargar el reporte
                            </Card.Text>
                            <Card.Text>
                                Reporte asistencia estudiantes equipos
                            </Card.Text>
                            <Form onSubmit={props.handleGenerarReporte}>
                                <Button variant="primary" type="submit">
                                    Generar
                                </Button>
                            </Form>
                            <Card.Link
                                href="http://localhost:3001/api/reportes/pdf"
                                download
                            >
                                Obtener archivo
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Container>
            )}
            {/* Si el usuario NO está autenticado */}
            {!usuario && (
                <Container spacing={2} justify="center">
                    <Card style={{ width: '30rem' }}>
                        <Card.Body>
                            <Card.Title>Bienvenido</Card.Title>
                            <Card.Text>
                                Este es el módulo de la unidad deportiva
                            </Card.Text>
                            <Card.Link href="/login">
                                Iniciar sesión aquí
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Container>
            )}
        </div>
    );
};
export default Principal;
