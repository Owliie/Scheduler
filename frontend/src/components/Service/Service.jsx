import React from 'react';
import classes from './Service.module.scss';

const Service = (props) => (
    <div className={classes.Service}>
        <div className={classes.Heading}>
            <p>icon {props.icon}</p>
            <p>heading {props.heading}</p>
        </div>
        <div className={classes.Body}>
            <p>img {props.image}</p>
            <p>caption {props.caption}</p>
        </div>
        <div className={classes.Footer}>
            <p>button {props.button}</p>
            {props.additionalBtn ?
                <p>like {props.additionalBtn}</p>
                : null
            }
        </div>
    </div>
)

export default Service;