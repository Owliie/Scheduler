import React, { useEffect, useRef, useState } from 'react';
// import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";

import { STATUS } from '../../utils/status';
import classes from './BHolderPortal.module.scss';
import { convertToTime } from '../../utils/converter';

let events = [
    {
        id: '620d7654d426a4beea96803a',
        createdOn: '2022-02-16T21:45:12.836+00:00',
        client: {
            id: '620d7654d426a4beea9680f3',
            firstName: 'Nasko',
            lastName: 'Atanasov',
            email: 'dev@scheduler.com',
            phone: '0876351984',
        },
        status: 'Pending', // Accepted
        start: '2022-02-17T17:30:00.000+00:00',
        durationInMinutes: 30,
        product: {
            id: '620d7654d426a4beea9680bb',
            name: 'Gentleman hairstyle',
            price: 30
        }
    },
    {
        id: '620d7654d426a4beea96803a',
        createdOn: '2022-02-16T21:45:12.836+00:00',
        client: {
            id: '620d7654d426a4beea9680f3',
            firstName: 'Neti',
            lastName: 'Tsvetkova',
            email: 'neti@scheduler.com',
            phone: '08763519843',
        },
        status: 'Pending', // Accepted
        start: '2022-02-17T18:00:00.000+00:00',
        durationInMinutes: 30,
        product: {
            id: '620d7654d426a4beea9680bb',
            name: 'Lady hairstyle',
            price: 30
        }
    }
]

const BHolderPortal = (props) => {
    const [data, setData] = useState({ businessBeginsHour: new Date(Date.now()).getHours(), businessEndsHour: 24, height: 500, heightSpec: 'Fixed' });
    const [event, setEvent] = useState(null);
    const calendarRef = useRef(null);

    useEffect(() => {
        mapEvents()
    }, []);

    const mapEvents = () => {
        events = events.map(e => {
            const start = new Date(e.start)
            const end = new Date(start.getTime() + +e.durationInMinutes * 60 * 1000).toISOString()
            e.end = end
            e.text = `${e.product.name}, ${e.client.firstName} ${e.client.lastName}, ${e.client.phone}`
            e.backColor = e.status === STATUS.PENDING ? 'lightgray' : 'lightgreen'
            return e
        })

        setData({ ...data, events })
    }

    const clickHandler = (e) => {
        setEvent(e.e.data)
    }

    const acceptEventHandler = () => {
        setEvent(null)
    }

    const rejectEventHandler = () => {

        setEvent(null)
    }

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
                    onEventClick={clickHandler}
                />
            </div>
            {event ?
                <div className={classes.Event}>
                    <div>
                        <p><span>Customer</span></p>
                        <p>
                            <span>{event.client.firstName}</span>
                            <span>{event.client.lastName}</span>
                        </p>
                        <p>
                            <span>{event.client.phone}</span>
                        </p>
                    </div>
                    <div>
                        <p><span>Appointment</span></p>
                        <p>
                            <span>{event.product.name}</span>
                            <span>${event.product.price}</span>
                        </p>
                        <p>
                            <span>{convertToTime(new Date(event.start).getHours(), new Date(event.start).getMinutes())}-{convertToTime(new Date(event.end).getHours(), new Date(event.end).getMinutes())}</span>
                        </p>

                    </div>
                    {event.status === STATUS.PENDING
                        ?
                        <div>
                            <p><span>Actions</span></p>
                            <button className={classes.AcceptBtn} onClick={acceptEventHandler}>Accept</button>
                            <button className={classes.RejectBtn} onClick={rejectEventHandler}>Reject</button>
                        </div>
                        : null}
                </div>
                : null}
        </div>
    )
}

export default BHolderPortal;