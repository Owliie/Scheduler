import React, { useState } from 'react';
import { Form, Tab, Tabs } from 'react-bootstrap';
import classes from './Registration.module.scss';
import { WorkingDays } from '../../utils/working-days';
import Button from '../Button/Button';

const Registration = (props) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [availability, setAvailability] = useState([]);

    return (
        <div className={classes.Register}>
            <Tabs
                defaultActiveKey="userRegister"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="userRegister" title="As customer">
                    <Form>
                        <h3 className="h3 text-center">Register</h3>
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Enter first name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Enter last name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={() => console.log('register')}>Register</Button>
                    </Form>
                </Tab>
                <Tab eventKey="bHolderRegister" title="As business holder">
                    <Form className={classes.BusinessRegister}>
                        <h3 className="h3 text-center">Register</h3>
                        <div className={classes.Content}>
                            <Form.Group className="mb-3" controlId="formGroupName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Enter first name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Enter last name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Business description</Form.Label>
                                <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter business description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter building address" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPhoneNumber">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Enter contact" />
                            </Form.Group>
                            <Form.Label>Availability</Form.Label>
                            <div className={classes.Availability}>
                                {Object.keys(WorkingDays).map((type) => (
                                    <div key={`inline-${type}`} className="mb-3 w-50 d-inline-block">
                                        <Form.Check
                                            type='checkbox'
                                            id={`default-${type}`}
                                            label={`${WorkingDays[type]}`}
                                            checked={availability.includes(+type)}
                                            onChange={(e) => { e.target.checked ? setAvailability([...availability, +type]) : setAvailability(availability.filter(a => a !== +type)) }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                        </div>
                        <Button onClick={() => console.log('register')}>Register</Button>
                    </Form>
                </Tab>
            </Tabs>
        </div >
    )
}

export default Registration;