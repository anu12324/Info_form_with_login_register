import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import axios, { Axios } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Crud = () => {

    const [userData, setUserData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        axios.get("http://localhost:8000/api/user").then((res) => {
            setUserData(res.data);
        });
    }

    const handleSubmit = (e) => {
        e.prevent.default();
    }

    const handleAdd = () => {
        let msg = '';
        if (!name || !email || !mobile || !mobile || !city) {
            if (!name) msg += 'Name, ';
            if (!email) msg += 'Email, ';
            if (!mobile) msg += 'Mobile, ';
            if (!city) msg += 'City, ';
            alert(`Please fill the following fields: ${msg.slice(0, -2)}`);
            return;
        }
        // axios.post("http://localhost:8000/api/user", { name: name, email: email, mobile: mobile, city: city })
        axios.post("http://localhost:8000/api/user", {
            name,
            email,
            mobile,
            city
        })
            .then((res) => {
                alert(`User Added Successfully!`);
                setName("");
                setEmail("");
                setMobile("");
                setCity("");
                getUserData();
            }).catch((err) => {
                alert(`Error while Adding user: ${err.message}`);
            });
    }

    const handleEdit = (id) => {
        setIsEdit(true);
        axios.get(`http://localhost:8000/api/user/${id}`).then((res) => {
            const data = res.data;
            setName(data.u_name);
            setEmail(data.u_email);
            setMobile(data.u_mobile);
            setCity(data.u_city);
        }).catch((err) => {
            alert(`Error while fetching user data : ${err.message}`);
        });
    }

    const handleUpdate = () => {

    }

    const handleDelete = () => {

    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <h5>Crud Operation</h5>
                    </Col>
                </Row>
                <Row>&nbsp;</Row>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col className='col-6 col-md-3'>
                            <Form.Group>
                                <Form.Label>Enter Your Name : </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Your Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col className='col-6 col-md-3'>
                            <Form.Group>
                                <Form.Label>Enter Your Email : </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Your Name'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col className='col-6 col-md-3'>
                            <Form.Group>
                                <Form.Label>Enter Mobile No.</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Your Mobile No.'
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col className='col-6 col-md-3'>
                            <Form.Group>
                                <Form.Label>Enter Your City</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Your City'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row>&nbsp;</Row>
                <Row>
                    <Col>
                        {
                            !isEdit ?
                                <Button className='styleButton' variant='outline-success' size='sm' onClick={handleAdd}>Add</Button>
                                :
                                <Button className='styleButton' variant='outline-success' size='sm' onClick={handleUpdate}>Update</Button>
                        }
                    </Col>
                </Row>
                <Row>&nbsp;</Row>
                {
                    !isEdit &&
                    <>

                        <Row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>City</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userData.map((row) => (
                                                <tr key={row.u_id}>
                                                    <td>{row.u_id}</td>
                                                    <td>{row.u_name}</td>
                                                    <td>{row.u_email}</td>
                                                    <td>{row.u_mobile}</td>
                                                    <td>{row.u_city}</td>
                                                    <td>
                                                        <div>
                                                            <span className='colorThemeBlue' onClick={handleEdit(row.u_id)}>
                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                            </span> &nbsp; &nbsp; &nbsp; &nbsp;
                                                            <span className='colorThemeBlue' onClick={handleDelete(row.u_id)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </>
                }
            </Container>
        </>
    )
}

export default Crud;
