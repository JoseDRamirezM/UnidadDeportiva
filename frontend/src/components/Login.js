import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

/**
 * Componente que se encarga de la autenticación
 * @param {} props
 * @returns
 */

const Login = (props) => {
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        /** Esta funcion se utiliza simplemente para redireccionar
         * al usuario a la página principal una vez haga el login
         */
        if (props.codEmpleado) {
            event.preventDefault();
            await props.handleLogin(event);
            navigate('/');
        }
    };

    return (
        <div>
            <Container spacing={2} justify="center">
                <h2>Iniciar sesión</h2>
                {/* Formulario para ingresar el código de empleado */}
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Codigo de empleado</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Codigo de empleado"
                            value={props.codEmpleado}
                            onChange={props.handleCodEmpleado}
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
export default Login;
