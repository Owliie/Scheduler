import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import classes from './Service.module.scss';

const Service = (props) => (
    <div className={classes.Service}>
        <div className={classes.Heading}>
            {props.icon}
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
                {props.image}
            </div>
            <p>{props.caption}</p>
        </div>
        <div className={classes.Footer}>
            <div className={classes.Btn}>{props.button}</div>
            {props.additionalBtn ?
                <p>like {props.additionalBtn}</p>
                : null
            }
        </div>
    </div>
)

export default Service;