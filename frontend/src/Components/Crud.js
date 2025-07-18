import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./crud.css";
import Common from "./../Common";
import Login from './Login';
import Register from './Register';

const Crud = () => {

    // const apiUrl = process.env.REACT_APP_API_URL; // ENV URL
    const apiUrl = "http://localhost:8000"; // local url

    // Form
    const [userData, setUserData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState("");
    const [uId, setUid] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistered, setIsRegisterd] = useState(false);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        axios.get(`${apiUrl}/api/user`).then((res) => {
            setUserData(res.data);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // const handleAdd = () => {
    //     let msg = '';
    //     if (!name || !email || !mobile || !mobile || !city) {
    //         if (!name) msg += 'Name, ';
    //         if (!email) msg += 'Email, ';
    //         if (!mobile) msg += 'Mobile, ';
    //         if (!city) msg += 'City, ';
    //         alert(`Please fill the following fields: ${msg.slice(0, -2)}`);
    //         return;
    //     }
    //     // axios.post("http://localhost:8000/api/user", { name: name, email: email, mobile: mobile, city: city })
    //     axios.post(`${apiUrl}/api/userPost`, {
    //         name,
    //         email,
    //         mobile,
    //         city
    //     })
    //         .then((res) => {
    //             alert(`User Added Successfully!`);
    //             setName("");
    //             setEmail("");
    //             setMobile("");
    //             setCity("");
    //             getUserData();
    //         }).catch((err) => {
    //             alert(`Error while Adding user: ${err.message}`);
    //         });
    // }

    const handleAdd = () => {
        if (!name || !email || !mobile || !city) {
            let msg = '';
            if (!name) msg += 'Name, ';
            if (!email) msg += 'Email, ';
            if (!mobile) msg += 'Mobile, ';
            if (!city) msg += 'City, ';
            alert(`Please fill the following fields: ${msg.slice(0, -2)}`);
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("city", city);
        if (image) formData.append("image", image);  //attach image file

        axios.post(`${apiUrl}/api/userPost`, formData)
            .then((res) => {
                alert("User Added Successfully");
                setName("");
                setEmail("");
                setMobile("");
                setCity("");
                setImage("");
                getUserData();
            })
            .catch((err) => {
                alert("Error: " + err.message);
            });
    };

    const handleEdit = (id) => {
        setUid(id);
        setIsEdit(true);
        axios.get(`${apiUrl}/api/userEdit/${id}`).then((res) => {
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
        axios.put(`${apiUrl}/api/userUpdate/${uId}`, {
            name, email, mobile, city
        }).then((res) => {
            alert("User Updated");
            setIsEdit(false);
            setName("");
            setEmail("");
            setMobile("");
            setCity("");
            setImage("");
            getUserData();
        }).catch((err) => {
            alert(`Error: ${err.message}`);
        });
    };


    const handleDelete = (id) => {
        if (!window.confirm("Are you sure to delete this user?")) return;

        axios.delete(`${apiUrl}/api/userDelete/${id}`)
            .then((res) => {
                alert("User deleted successfully");
                getUserData();
            }).catch((err) => {
                alert("Error deleting user: " + err.message);
            });
    };


    return (
        <>
            <Container className='mt-5 w-50'>
                <Row>
                    <Col className='text-center bg-success'>
                        <h3> Please Fill Your Form </h3>
                    </Col>
                </Row>
                <Row>&nbsp;</Row>
                {
                    !isLoggedIn &&
                    <>
                        <Login />
                    </>
                }
                {
                    !isRegistered &&
                    <>
                        <Register />
                    </>
                }
                {
                    (isLoggedIn && isRegistered) &&
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col className='col-6 col-md-6'>
                                    <Form.Group>
                                        <Form.Label>Name : </Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Your Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className='col-6 col-md-6'>
                                    <Form.Group>
                                        <Form.Label>Email : </Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Your Name'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row><Row>
                                <Col className='col-6 col-md-6'>
                                    <Form.Group>
                                        <Form.Label>Mobile No.</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Your Mobile No.'
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className='col-6 col-md-6'>
                                    <Form.Group>
                                        <Form.Label>Your City</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Your City'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='col-6 col-md-6  '>
                                    <Form.Group>
                                        <Form.Label>Select Picture</Form.Label>
                                        <Form.Control
                                            type='file'
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col style={{ marginTop: '35px' }}>
                                    {
                                        !isEdit ?
                                            <Button className='styleButton' variant='outline-success' size='sm' onClick={handleAdd}>Add</Button>
                                            :
                                            <Button className='styleButton' variant='outline-success' size='sm' onClick={handleUpdate}>Update</Button>
                                    }
                                </Col>
                            </Row>
                        </Form>
                        <Row>&nbsp;</Row>
                        {
                            !isEdit &&
                            <>

                                <Row>
                                    <Col>
                                        <Table bordered striped>
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
                                                                    <span className='colorThemeBlue' onClick={() => handleEdit(row.u_id)}>
                                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                                    </span> &nbsp;
                                                                    <span className='colorThemeBlue' onClick={() => handleDelete(row.u_id)} >
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
                    </>
                }
            </Container>
        </>
    )
}

export default Crud;
