import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Crud from "./Crud";

const Login = () => {

    // const apiUrl = process.env.REACT_APP_API_URL; // ENV URL
    const apiUrl = "http://localhost:8000"; // local url

    // Login 
    // const [loginCred, setLoginCred] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userSrno, setUserSrno] = useState("");
    const [userStatus, setUserStatus] = useState("");

    // Register
    const [regFirstName, setRegFirstName] = useState("");
    const [regLastName, setRegLastName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showFormDetails, setShowFormDetails] = useState(false);

    const handleRegister = () => {
        if (!regFirstName || !regLastName || !regEmail || !regPassword || !regConfirmPassword || (regPassword !== regConfirmPassword)) {
            let msg = '';
            if (!regFirstName) msg += 'First Name, ';
            if (!regEmail) msg += 'Email, ';
            if (!regPassword) msg += 'Password, ';
            if (!regConfirmPassword) msg += 'Confirm Password, ';
            if (regPassword !== regConfirmPassword) msg += 'Confirm password is not matching with your password, ';
            alert(`Please fill the following fields: ${msg.slice(0, -2)}`);
            return;
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(regPassword)) {
            alert('Password must be 8 character (password should be in an uppercase letter, number, and special character) ');
            return;
        }
        axios.post(`${apiUrl}/api/register`, { firstName: regFirstName, lastName: regLastName, email: regEmail, password: regPassword, confirmPassword: regConfirmPassword })
            .then((res) => {
                alert("User Registerd!");
                setRegFirstName("");
                setRegLastName("");
                setRegEmail("");
                setRegPassword("");
                setRegConfirmPassword("");
                setUserEmail("");
                setUserEmail("");
                setIsLoggedIn(true);
            }).catch((err) => {
                alert(`Error : ${err.message}`);
            });
    }

    const handleLogin = () => {
        if (!userEmail || !userPass) {
            let msg = '';
            if (!userEmail) msg += 'User Email, ';
            if (!userPass) msg += 'Password, ';
            alert(`Please Fill the following fields : ${msg.slice(0, -2)}`);
            return;
        }
        axios.post(`${apiUrl}/api/userLogin`, { userEmail, userPass })
            .then((res) => {
                console.log(res.data);
                // setLoginCred(res.data);
                if (res.data.uinfo_email === userEmail && res.data.uinfo_password === userPass) {
                    alert(` User '${userEmail}' Logged In Successfully!`);
                    setUserSrno(res.data.uinfo_srno);
                    setUserStatus(res.data.uinfo_status);
                    setShowFormDetails(true);
                } else {
                    console.warn(`User email or Password Incorrect!`);
                }
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    alert(`Error: ${err.response.data.error}`);
                } else {
                    alert(`Error: ${err.message}`);
                }
            });
    }


    return (
        <>
            <Container>
                {
                    (isLoggedIn && !showFormDetails) ?
                        <>
                            <Row className='text-center'>
                                <h3>Login</h3>
                            </Row>
                            <Row>&nbsp;</Row>
                            <Row>
                                <Col className='col-6 col-md-12'>
                                    <Form.Group>
                                        <Form.Label>User Email : </Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='User Email'
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='col-6 col-md-12'>
                                    <Form.Group>
                                        <Form.Label>Password : </Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Password'
                                            value={userPass}
                                            onChange={(e) => setUserPass(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>&nbsp;</Row>
                            <div className='text-center'>
                                <Button className='styleButton' variant='outline-primary' size='sm' onClick={handleLogin}>Login</Button>
                            </div>
                            <div className='text-center'>
                                Don't have an account?
                                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsLoggedIn(false)}>Register</span>
                            </div>
                        </> : (isLoggedIn && showFormDetails) ?
                            <>
                                <Crud userSrno={userSrno} userStatus={userStatus} />
                            </> :
                            <>
                                <Row className='text-center'>
                                    <h3>Register</h3>
                                </Row>
                                <Row>&nbsp;</Row>
                                <Row>
                                    <Col className='col-6 col-md-12'>
                                        <Form.Group>
                                            <Form.Label>First Name : </Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Enter First Name'
                                                value={regFirstName}
                                                onChange={(e) => setRegFirstName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='col-6 col-md-12'>
                                        <Form.Group>
                                            <Form.Label>Last Name : </Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Enter Last Name'
                                                value={regLastName}
                                                onChange={(e) => setRegLastName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='col-6 col-md-12'>
                                        <Form.Group>
                                            <Form.Label>Email : </Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Enter Email'
                                                value={regEmail}
                                                onChange={(e) => setRegEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='col-6 col-md-12'>
                                        <Form.Group>
                                            <Form.Label>Password : </Form.Label>
                                            <Form.Control
                                                type='password'
                                                placeholder='Password'
                                                value={regPassword}
                                                onChange={(e) => setRegPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='col-6 col-md-12'>
                                        <Form.Group>
                                            <Form.Label>Confirm Password : </Form.Label>
                                            <Form.Control
                                                type='password'
                                                placeholder='Password'
                                                value={regConfirmPassword}
                                                onChange={(e) => setRegConfirmPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>&nbsp;</Row>
                                <div className='text-center'>
                                    <Button className='styleButton' variant='outline-success' size='sm' onClick={handleRegister}>Register</Button><br />
                                    Already have an account?
                                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsLoggedIn(true)}>Login</span>
                                </div>
                            </>
                }
            </Container>
        </>
    )
}

export default Login