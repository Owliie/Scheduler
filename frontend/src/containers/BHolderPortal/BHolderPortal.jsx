import React, { useEffect, useRef, useState } from 'react';
import { DayPilotCalendar } from "daypilot-pro-react";

import { STATUS } from '../../utils/status';
import classes from './BHolderPortal.module.scss';
import { convertToTime } from '../../utils/converter';
import BusinessService from '../../services/businessService';
import AppointmentService from '../../services/appointmentService';

const BHolderPortal = (props) => {
    const [data, setData] = useState({
        businessBeginsHour: new Date(Date.now()).getHours(),
        businessEndsHour: 24,
        height: 500,
        heightSpec: 'Fixed',
        startDate: new Date(Date.now()).toISOString()
    });
    const [event, setEvent] = useState(null);
    const [editData, setEditData] = useState({});
    const calendarRef = useRef(null);

    useEffect(() => {
        loadEvents()
    }, [data.startDate]);

    const loadEvents = async () => {
        const res = await BusinessService.getSchedule(data.startDate)
        const events = res.map(e => {
            const start = new Date(e.start)
            start.setHours(start.getHours() + 2)

            const end = new Date(start.getTime() + +e.durationInMinutes * 60 * 1000).toISOString()

            e.start = start
            e.end = end
            e.text = `${e.product.name}, ${e.client.firstName} ${e.client.lastName}, ${e.client.phone}`
            e.backColor = e.status === STATUS.PENDING ? 'lightgray' : '#415a74'
            e.fontColor = e.status === STATUS.PENDING ? 'black' : 'white'
            return e
        })

        setData({ ...data, events })
    }

    const clickHandler = (e) => {
        setEvent(e.e.data)
    }

    const movedHandler = async (e) => {
        const appointment = e.e.data
        const newStart = e.newStart

        await editAppointment(appointment.id, newStart, appointment.durationInMinutes)
    }

    const editDetailsHandler = async (e) => {
        e.preventDefault()

        const time = editData.start.split(':')
        const hours = time[0]
        const minutes = time[1]
        const start = new Date(event.start)
        start.setHours(hours)
        start.setMinutes(minutes)
        const duration = editData.duration

        await editAppointment(event.id, start, duration)

        setEditData({})
    }

    const editAppointment = async (id, start, durationInMinutes) => {
        await AppointmentService.editAppointment(id, { start, durationInMinutes })
        await loadEvents()
    }


    const acceptEventHandler = async () => {
        await AppointmentService.acceptAppointment(event.id)

        await loadEvents()
        setEvent(null)
    }

    const rejectEventHandler = async () => {
        await AppointmentService.rejectAppointment(event.id)

        await loadEvents()
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
                    onChange={(e) => {
                        setData({
                            ...data, startDate: new Date(e.target.value).toISOString()
                        })
                        setEvent(null)
                    }
                    } />
            </div>
            <div className={classes.Calendar}>
                <DayPilotCalendar ref={calendarRef}
                    {...data}
                    onEventClick={clickHandler}
                    onEventMoved={movedHandler}
                />
            </div>
            {event ?
                <>
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
                                -
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
                    <div className={[classes.Event, classes.Edit].join(' ')}>
                        <div>
                            <p><span>Edit</span></p>
                            <form onSubmit={editDetailsHandler} onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}>
                                <input type='time' name='start' placeholder='Start hour' />
                                <input name='duration' placeholder='Duration' />
                                <button type='submit'>Save</button>
                            </form>
                        </div>
                    </div>
                </>
                : null}
        </div >
    )
}

export default BHolderPortal;