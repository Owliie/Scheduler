import React, { useEffect, useRef, useState } from 'react';
// import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";

import classes from './BHolderPortal.module.scss';

const BHolderPortal = (props) => {
    const [data, setData] = useState({ businessBeginsHour: new Date(Date.now()).getHours(), businessEndsHour: 24, height: 500, heightSpec: 'Fixed' });
    const calendarRef = useRef(null);

    useEffect(() => {

    }, []);

    return (
        <div className={classes.Container}>
            <div className={classes.Heading}>
                <h1>Your schedule</h1>
                <p>Everything booked up to now</p>
            </div>
            <div className={classes.Selector}>
                <p>Select date</p>
                <input type='date'
                    className={classes.DateSelector}
                    onChange={(e) =>
                        setData({
                            ...data, startDate: new Date(e.target.value).toISOString()
                        })
                    } />
            </div>
            <div className={classes.Calendar}>
                <DayPilotCalendar ref={calendarRef}
                    {...data}
                />
            </div>
        </div>
    )
}

export default BHolderPortal;