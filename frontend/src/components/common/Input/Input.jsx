import React from 'react';
import { Form } from 'react-bootstrap';
import classes from './Input.module.scss';
import PropTypes from 'prop-types';

const Input = (props) => {
    const validate = (field, setField, fn) => {
        if (props.onBlur) {
            setField({ ...field, valid: fn(field.value) && props.onBlur() })
        } else {
            setField({ ...field, valid: fn(field.value) })
        }
    }

    const changeField = (field, setField, newValue) => {
        setField({ ...field, value: newValue, valid: true })
    }

    return (
        <Form.Group className={["mb-3", classes.Input].join(', ')} controlId={props.controlId}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control value={props.field.value}
                onChange={(e) => changeField(props.field, props.setField, e.target.value)}
                onBlur={() => validate(props.field, props.setField, props.validateFn)}
                type={props.type} placeholder={props.placeholder} />
            {!props.field.valid ? <span>{props.field.message}</span> : null}
        </Form.Group>
    )
}

Input.propTypes = {
    controlId: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    field: PropTypes.object,
    setField: PropTypes.func,
    validateFn: PropTypes.func,
};

export default Input;