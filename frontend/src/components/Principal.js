import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

/**
 * Este componente renderiza la página principal
 * tanto para usuarios autenticados como anónimos
 * @param {*} props
 * @returns
 */

const Principal = (props) => {
    return (
        <div>
            {/* Si el usuario está autenticado */}
            {props.autorizado && (
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
                            <Card.Title>Información de auxiliar</Card.Title>

                            <Card.Text>
                                <strong> Nombre: </strong>
                            </Card.Text>
                            <Card.Text>
                                <strong> Sede:</strong>
                            </Card.Text>
                            <Card.Text>
                                <strong> Cargo:</strong>
                            </Card.Text>
                            <Card.Text>
                                <strong> Fecha: </strong>
                                {props.fechaHora}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            )}
            {/* Si el usuario NO está autenticado */}
            {!props.autorizado && (
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
