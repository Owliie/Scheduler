import React, { useState } from "react";
import classes from './Sign.module.scss';
// import Spinner from "../../components/Spinner/Spinner";
import { Form, Tab, Tabs } from "react-bootstrap";
import Registration from "../../components/Registration/Registration";
import Button from "../../components/Button/Button";
import { validateEmail, validatePassword } from "../../utils/validation";

const Login = (props) => {
    const [emailField, setEmailField] = useState({ value: "", valid: true, message: 'Invalid email' });
    const [passwordField, setPasswordField] = useState({ value: "", valid: true, message: 'Password must contain at least 1 upper case letter, 1 lower case letter and 1 number. It should be at least 8 characters!' });

    const validate = (field, setField, fn) => {
        setField({ ...field, valid: fn(field.value) })
    }

    const changeField = (field, setField, newValue) => {
        setField({ ...field, value: newValue, valid: true })
    }

    return (
        <div className={classes.Form}>
            <div className={classes.Tabs}>
                <Tabs
                    defaultActiveKey="login"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="login" title="Log in">
                        <Form>
                            <h3 className="h3 text-center">Log in</h3>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={emailField.value}
                                    onChange={(e) => changeField(emailField, setEmailField, e.target.value)}
                                    onBlur={() => validate(emailField, setEmailField, validateEmail)}
                                    type="email" placeholder="Enter email" />
                                {!emailField.valid ? <span>{emailField.message}</span> : null}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={[passwordField.value]}
                                    onChange={(e) => changeField(passwordField, setPasswordField, e.target.value)}
                                    onBlur={() => validate(passwordField, setPasswordField, validatePassword)}
                                    type="password" placeholder="Password" />
                                {!passwordField.valid ? <span>{passwordField.message}</span> : null}
                            </Form.Group>
                            <Button onClick={() => console.log('login')}>Login</Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="register" title="Register">
                        <Registration />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default Login