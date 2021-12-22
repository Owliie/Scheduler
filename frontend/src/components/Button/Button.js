import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
    return (
        <button
            className={["btn btn-success", classes.Btn].join(', ')}
            type="button"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button;