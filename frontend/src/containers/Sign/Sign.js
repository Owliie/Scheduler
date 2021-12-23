import React, { useState } from "react";
import classes from './Sign.module.scss';
// import Spinner from "../../components/Spinner/Spinner";
import { Form, Tab, Tabs } from "react-bootstrap";
import Registration from "../../components/Registration/Registration";
import Button from "../../components/common/Button/Button";
import { validateEmail, validatePassword } from "../../utils/validation";
import Input from "../../components/common/Input/Input";

const Login = (props) => {
    const [emailField, setEmailField] = useState({ value: "", valid: true, message: 'Invalid email' });
    const [passwordField, setPasswordField] = useState({ value: "", valid: true, message: 'Password must contain at least 1 upper case letter, 1 lower case letter and 1 number. It should be at least 8 characters!' });

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
                            <Input
                                controlId="formGroupEmail" type="email"
                                placeholder="Enter email" label="Email address"
                                field={emailField} setField={setEmailField}
                                validateFn={validateEmail} />
                            <Input
                                controlId="formGroupPassword" type="password"
                                placeholder="Enter password" label="Password"
                                field={passwordField} setField={setPasswordField}
                                validateFn={validatePassword} />
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