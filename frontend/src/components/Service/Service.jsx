import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import classes from './Service.module.scss';

const Service = (props) => (
    <div className={classes.Service}>
        <div className={[classes.Heading, props.theme].join(' ')}>
            {typeof props.icon === 'string'
                ?
                <img className={classes.Icon} src={props.icon} alt='icon' />
                : props.icon}
            <OverlayTrigger
                key={'right'}
                placement={'right'}
                overlay={
                    <Tooltip id={`tooltip-right`}>
                        {props.heading}
                    </Tooltip>
                }
            >
                <p>{props.heading}</p>
            </OverlayTrigger>
        </div>
        <div className={classes.Body}>
            <div className={classes.Image}>
                <img className={classes.Image} src={props.image} alt='background' />
            </div>
            <p>{props.caption}</p>
        </div>
        <div className={[classes.Footer, props.theme].join(' ')}>
            <div className={classes.Btn}>{props.button}</div>
            {props.additionalBtn ?
                props.additionalBtn
                : null
            }
        </div>
    </div>
)

export default Service;