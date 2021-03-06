import React, { useState } from 'react';
import { Form, Tab, Tabs } from 'react-bootstrap';
import classes from './Registration.module.scss';
import { WorkingDays } from '../../utils/working-days';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import { toastHandler, TOAST_STATES } from '../../helpers/toast';
import { validateAddress, validateConfirmPassword, validateDescription, validateEmail, validateName, validatePassword, validatePhoneNumber } from '../../utils/validation';
import { useStoreActions } from 'easy-peasy';

const defaultValues = {
    email: { name: 'email', value: "", valid: true, message: 'Invalid email' },
    password: { name: 'password', value: "", valid: true, message: 'Password must contain at least 1 upper case letter, 1 lower case letter and 1 number. It should be at least 8 characters!' },
    confirmPassword: { name: 'confirmPassword', value: "", valid: true, message: 'Passwords not matching' },
    firstName: { name: 'firstName', value: "", valid: true, message: 'First name should be at least 2 characters long' },
    lastName: { name: 'lastName', value: "", valid: true, message: 'Last name should be at least 2 characters long' },
    description: { name: 'description', value: "", valid: true, message: 'Description should be at least 20 characters long' },
    address: { name: 'address', value: "", valid: true, message: 'Address should be at least 10 characters long' },
    phoneNumber: { name: 'phone', value: "", valid: true, message: 'Invalid phone number' },
    availability: { name: 'availability', value: "", valid: true, message: '' }
}

const Registration = (props) => {
    const { registerCustomer, registerBusinessHolder } = useStoreActions(actions => actions.userStore);

    const [activeTab, setActiveTab] = useState("userRegister");
    const [emailField, setEmailField] = useState(defaultValues.email);
    const [firstNameField, setFirstNameField] = useState(defaultValues.firstName);
    const [lastNameField, setLastNameField] = useState(defaultValues.lastName);
    const [passwordField, setPasswordField] = useState(defaultValues.password);
    const [confirmPasswordField, setConfirmPasswordField] = useState(defaultValues.confirmPassword);
    const [descriptionField, setDescriptionField] = useState(defaultValues.description);
    const [addressField, setAddressField] = useState(defaultValues.address);
    const [phoneNumberField, setPhoneNumberField] = useState(defaultValues.phoneNumber);
    const [availability, setAvailability] = useState([]);

    const activeTabChanged = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab)
            clearForm()
        }
    }

    const clearForm = () => {
        setEmailField(defaultValues.email)
        setFirstNameField(defaultValues.firstName)
        setLastNameField(defaultValues.lastName)
        setPasswordField(defaultValues.password)
        setConfirmPasswordField(defaultValues.confirmPassword)
        setDescriptionField(defaultValues.description)
        setAddressField(defaultValues.address)
        setPhoneNumberField(defaultValues.phoneNumber)
        setAvailability([])
    }

    const validateConfirmPasswordHandler = () => {
        return validateConfirmPassword(passwordField.value, confirmPasswordField.value)
    }

    const registerCustomerClickedHandler = () => {
        let valid = true;
        for (const data of fields.slice(0, 5)) {
            if (!data.field.valid || data.field.value === "") {
                valid = false
            }
        }

        if (valid && (!confirmPasswordField.valid || confirmPasswordField.value === "")) {
            valid = false
        }

        const data = {}
        fields.slice(0, 5).forEach(el => {
            data[el.field.name] = el.field.value
        })

        if (valid) {
            registerCustomer(data)
            clearForm()
        } else {
            toastHandler({ success: TOAST_STATES.ERROR, message: 'Invalid form fields' })
        }
    }

    const registerBHolderClickedHandler = async () => {
        let valid = true;
        for (const data of fields) {
            if (!data.field.valid || data.field.value === "") {
                valid = false
            }
        }

        if (valid && (!confirmPasswordField.valid || confirmPasswordField.value === "" || availability.length === 0)) {
            valid = false
        }

        const data = {}
        fields.forEach(el => {
            data[el.field.name] = el.field.value
        })

        if (valid) {
            registerBusinessHolder(data)
            clearForm()
        } else {
            toastHandler({ success: TOAST_STATES.ERROR, message: 'Invalid form fields' })
        }
    }

    const fields = [
        {
            controlId: 'formGroupName', label: 'First name', type: 'text', placeholder: 'Enter first name',
            field: firstNameField, setField: setFirstNameField, validateFn: validateName
        },
        {
            controlId: 'formGroupName', label: 'Last name', type: 'text', placeholder: 'Enter last name',
            field: lastNameField, setField: setLastNameField, validateFn: validateName
        },
        {
            controlId: 'formGroupPhoneNumber', label: 'Phone number', type: 'text', placeholder: 'Enter phone number',
            field: phoneNumberField, setField: setPhoneNumberField, validateFn: validatePhoneNumber
        },
        {
            controlId: 'formGroupEmail', label: 'Email', type: 'email', placeholder: 'Enter email',
            field: emailField, setField: setEmailField, validateFn: validateEmail
        },
        {
            controlId: 'formGroupPassword', label: 'Password', type: 'password', placeholder: 'Enter password',
            field: passwordField, setField: setPasswordField, validateFn: validatePassword
        },
        {
            controlId: 'formGroupDescription', label: 'Description', type: 'text', placeholder: 'Enter description',
            field: descriptionField, setField: setDescriptionField, validateFn: validateDescription
        },
        {
            controlId: 'formGroupAddress', label: 'Address', type: 'text', placeholder: 'Enter address',
            field: addressField, setField: setAddressField, validateFn: validateAddress
        }
    ]

    return (
        <div className={classes.Register}>
            <Tabs
                defaultActiveKey="userRegister"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
                onSelect={activeTabChanged}
            >
                <Tab eventKey="userRegister" title="As customer">
                    <Form>
                        <h3 className="h3 text-center">Register</h3>
                        {fields.slice(0, 5).map(data => {
                            return (<Input key={data.label}
                                controlId={data.controlId} label={data.label}
                                type={data.type} placeholder={data.placeholder}
                                field={data.field} setField={data.setField}
                                validateFn={data.validateFn} />)
                        })}
                        <Input
                            controlId='formGroupPassword' label='Confirm password'
                            type='password' placeholder='Enter password'
                            field={confirmPasswordField} setField={setConfirmPasswordField}
                            validateFn={validatePassword} onBlur={validateConfirmPasswordHandler} />
                        <Button onClick={registerCustomerClickedHandler}>Register</Button>
                    </Form>
                </Tab>
                <Tab eventKey="bHolderRegister" title="As business holder">
                    <Form className={classes.BusinessRegister}>
                        <h3 className="h3 text-center">Register</h3>
                        <div className={classes.Content}>
                            {fields.slice(0, 4).concat(fields.slice(4)).map(data => {
                                return (<Input key={data.label}
                                    controlId={data.controlId} label={data.label}
                                    type={data.type} placeholder={data.placeholder}
                                    field={data.field} setField={data.setField}
                                    validateFn={data.validateFn} />)
                            })}
                            <div className={classes.Availability}>
                                <Form.Label>Availability</Form.Label>
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
                            <Input
                                controlId='formGroupPassword' label='Password'
                                type='password' placeholder='Enter password'
                                field={passwordField} setField={setPasswordField}
                                validateFn={validatePassword} />
                            <Input
                                controlId='formGroupPassword' label='Confirm password'
                                type='password' placeholder='Enter password'
                                field={confirmPasswordField} setField={setConfirmPasswordField}
                                validateFn={validatePassword} onBlur={validateConfirmPasswordHandler} />
                        </div>
                        <Button onClick={registerBHolderClickedHandler}>Register</Button>
                    </Form>
                </Tab>
            </Tabs>
        </div >
    )
}

export default Registration;