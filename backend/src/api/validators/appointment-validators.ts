import { body } from 'express-validator'
import { AppointmentColumns } from '../../data/models/appointment-columns'

export const AppointmentValidators = [
    body(AppointmentColumns.start).isISO8601(),
    body(AppointmentColumns.durationInMinutes).isInt()
]
