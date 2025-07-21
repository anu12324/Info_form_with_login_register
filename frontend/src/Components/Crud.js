import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
// import Select from "react-select";
import "./crud.css";
import Common from "./../Common";
import Login from './Login';

const Crud = (props) => {

    // const apiUrl = process.env.REACT_APP_API_URL; // ENV URL
    const apiUrl = "http://localhost:8000"; // local url

    // Form
    const fileInputRef = useRef();
    const [userData, setUserData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState("");
    const [uId, setUid] = useState(0);

    // Modal to view uploaded image 
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Show Admin Login
    const [selectLogin, setSelectLogin] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true);


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

    const handleAdd = () => {
        if (!name || !email || !mobile || !city || !image) {
            let msg = '';
            if (!name) msg += 'Name, ';
            if (!email) msg += 'Email, ';
            if (!mobile) msg += 'Mobile, ';
            if (!city) msg += 'City, ';
            if (!image) msg += 'Select Image, ';
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
                fileInputRef.current.value = null;
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
            setImage(data.u_image);
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

    // const handleImageView = (filename) => {
    //     const imageUrl = `${apiUrl}/uploads/${filename}`;
    //     window.open(imageUrl, "_blank");
    // };

    // View image in modal box
    const handleImageView = (filename) => {
        const imageUrl = `${apiUrl}/uploads/${filename}`;
        setSelectedImage(imageUrl);
        setShowImageModal(true);
    };

    const handleSelectLogin = (e) => {
        setSelectLogin(e.target.value);
        // if (selectLogin === "logout") {
        if (e.target.value === "logout") {
            axios.put(`${apiUrl}/api/userLogout/${props.userSrno}`)
                .then((res) => {
                    alert(`User Logged Out Successfully!`);
                    setIsLoggedIn(false);
                }).catch((err) => {
                    alert(`Error Logging out: ${err.message}`);
                });
        }
    };


    return (
        <>
            <Container className='mt-5 w-75'>
                {
                    isLoggedIn ?
                        <>
                            <Form onSubmit={handleSubmit}>
                                <Row className='bg-success'>
                                    <Col className='col-6 col-md-10'>
                                        <h3>Fill Form (Information Form)</h3>
                                    </Col>
                                    <Col className='col-6 col-md-1'>
                                        <select className='h-100 rounded-left' value={selectLogin} onChange={(e) => handleSelectLogin(e)} >
                                            {
                                                (!(props.userSrno) && !(props.userStatus)) ? <option value="login">Login</option> :
                                                    (props.userStatus == 1) &&
                                                    <>
                                                        <option value={props.userSrno}>{props.userName}</option>
                                                        <option value="logout">Log out</option>
                                                    </>
                                            }
                                        </select>
                                    </Col>
                                </Row>
                                <Row>&nbsp;</Row>
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
                                                placeholder='Enter Your Email'
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
                                                ref={fileInputRef}
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
                                                        <th>Image</th>
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
                                                                    {row.u_image}&nbsp; &nbsp;
                                                                    {row.u_image &&
                                                                        (<span className='colorThemeBlue' style={{ cursor: 'pointer', marginTop: '50px' }} onClick={() => handleImageView(row.u_image)}><FontAwesomeIcon icon={faEye} /></span>
                                                                        )}
                                                                    {/* &nbsp; &nbsp;{row.u_image} */}
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <span className='colorThemeBlue' style={{ cursor: 'pointer' }} onClick={() => handleEdit(row.u_id)}>
                                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                                        </span> &nbsp;
                                                                        <span className='colorThemeDelete' onClick={() => handleDelete(row.u_id)} >
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
                        </> :
                        <>
                            <Login />
                        </>
                }
            </Container>
            <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {selectedImage && (
                        <img src={selectedImage} alt="User Upload" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowImageModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Crud;
