import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logImg from './resource/img/imgLog.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory, NavLink } from 'react-router-dom'


export default (props) => {
    //Here we use react useState to capture the changes on email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const firebase = useFirebaseApp();
    const user = useUser();

    //login with firebaise and set the email and password empty.
    const submit = async (e) => {
        e.preventDefault();

        if (email.lastIndexOf("@") < email.lastIndexOf(".") && email.lastIndexOf("@") > 1 && password !== null && password.length > 5) {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            setEmail('');
            setPassword('');
            history.push("/listUsers");
        }     
    }

    return (
        <div className="pd-top">
            {
                !user &&
                <Container>                   
                    <Row className="justify-content-md-center">
                        <Col><img className="img-dimension" alt="sign in" src={logImg}></img></Col>
                    </Row>
                    <Form onSubmit={submit}>
                    <Row className="justify-content-md-center pd-top">
                        <Col  md={4}><Form.Control
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo"
                            className="inpt"
                            required
                        />
                        </Col>
                    </Row>
                    
                    <Row className="justify-content-md-center pd-top-15">
                        <Col  md={4}><Form.Control
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            className="inpt"
                            required
                        />
                        </Col>
                    </Row>
                    <div>
                        {email.length > 1 ?
                            email.lastIndexOf("@") < email.lastIndexOf(".") && email.lastIndexOf("@") > 1 ? "" : <p style={{color:"red"}}>Ingrese un correo valido</p> : ""
                        }

                        {password.length > 1 && password.length < 6 ? <p style={{color:"red"}}>La contraseña debe contener 6 caracteres</p> : ""}
                    </div>
                    <div className="pd-top-15">
                        <Button variant="outline-primary" type="submit">
                            Ingresar
                        </Button>
                        
                    </div>
                    </Form>
                    <div className="pd-top-15">
                        <NavLink variant="outline-primary" to="/register" type="submit">
                            Registro
                        </NavLink>
                    </div>
                </Container>
            }          
        </div>
    )
}