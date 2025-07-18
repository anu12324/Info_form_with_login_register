import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Login = () => {

    const apiUrl = process.env.REACT_APP_API_URL; // ENV URL

    // Login 
    const [username, setUsername] = useState("");
    const [userPass, setUserPass] = useState("");

    const handleLogin = () => {

    }

    return (
        <>
            <Container>
                <Row>
                    <h3>Login</h3>
                </Row>
                <Row>&nbsp;</Row>
                <Row>
                    <Col className='col-6 col-md-6'>
                        <Form.Group>
                            <Form.Label>Username : </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-6 col-md-6'>
                        <Form.Group>
                            <Form.Label>Password : </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Password'
                                value={userPass}
                                onChange={(e) => setUserPass(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>&nbsp;</Row>
                <Row>
                    <Button className='styleButton' variant='outline-primary' size='sm' onClick={handleLogin}>Login</Button>
                </Row>
            </Container>
        </>
    )
}

export default Login
