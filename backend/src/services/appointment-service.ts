import { AppointmentStatus } from '../models/enums/appointment-status'
import { QueryArgsHelper } from '../utils/query-args-helper'
import { AppointmentColumns } from '../data/models/appointment-columns'
import { Repository } from '../data/repositories'
import { AppointmentModel } from '../models/appointment-model'
import { TimeModel } from '../models/common/time-model'
import { TimeHelper } from '../utils/time-helper'
import { Appointment } from '../data/models'
import { DateExtensions } from '../utils/date-extensions'

const appointments = [
    {
        id: '6c9ef89f-d9b0-43c6-9aae-991022818847',
        start: '2022-01-29T14:00:00',
        durationInMinutes: '2022-01-29T15:00:00',
        product: 'Lady hairstyle',
        businessHolder: {
            id: '6c9ef89f-d9b0-43c6-9aae-99102281884e'
        },
        client: {
            firstName: 'Ivan',
            lastName: 'Ivanov',
            phone: '+35976351998'
        },
        status: AppointmentStatus.Accepted
    },
    {
        id: '6c9ef89f-d9b0-43c6-9aae-991022818841',
        start: '2022-01-29T15:00:00',
        durationInMinutes: '2022-01-29T15:00:00',
        product: 'Children hairstyle',
        businessHolder: {
            id: '6c9ef89f-d9b0-43c6-9aae-99102281884e'
        },
        client: {
            firstName: 'Ivancho',
            lastName: 'Ivanov',
            phone: '+35976351978'
        },
        status: AppointmentStatus.Accepted
    },
    {
        id: '6c9ef89f-d9b0-43c6-9aae-991022818840',
        start: '2022-01-29T17:00:00',
        durationInMinutes: '2022-01-29T17:30:00',
        product: 'Gentleman hairstyle',
        businessHolder: {
            id: '6c9ef89f-d9b0-43c6-9aae-99102281884e'
        },
        client: {
            firstName: 'Maria',
            lastName: 'Luiza',
            phone: '+35977351978'
        },
        status: AppointmentStatus.Accepted
    },
    {
        id: '6c9ef89f-d9b0-43c6-9aae-991022818842',
        start: '2022-01-29T17:00:00',
        durationInMinutes: '2022-01-29T17:30:00',
        product: 'Gentleman hairstyle',
        businessHolder: {
            id: '6c9ef89f-d9b0-43c6-9aae-99102281884e'
        },
        client: {
            firstName: 'Marian',
            lastName: 'Marianov',
            phone: '+35977351978'
        },
        status: AppointmentStatus.Declined
    },
    {
        id: '6c9ef89f-d9b0-43c6-9aae-991022818843',
        start: '2022-01-29T12:00:00',
        durationInMinutes: '2022-01-29T12:30:00',
        product: 'Gentleman hairstyle',
        businessHolder: {
            id: '6c9ef89f-d9b0-43c6-9aae-99102281884e'
        },
        client: {
            firstName: 'Peter',
            lastName: 'Petrov',
            phone: '+35977351978'
        },
        status: AppointmentStatus.Pending
    },
    {
        id: '6c9ef89f-d9b0-43c6-9aae-991022818844',
        start: '2022-01-29T10:00:00',
        durationInMinutes: '2022-01-29T10:30:00',
        product: 'Gentleman hairstyle',
        businessHolder: {
            id: '6c9ef89f-d9b0-43c6-9aae-99102281884e'
        },
        client: {
            firstName: 'Atanas',
            lastName: 'Vasilev',
            phone: '+35977351978'
        },
        status: AppointmentStatus.Pending
    }
]

class AppointmentService {

    private appointmentsData: Repository<AppointmentModel>

    public constructor (appointmentsData: Repository<AppointmentModel>) {
        this.appointmentsData = appointmentsData
    }

    public async getApprovedByBusinessAndDate (businessId: string, date: Date): Promise<any> {
        const result = appointments
            .filter(a => a.status === AppointmentStatus.Accepted)
        return Promise.resolve([...result])
    }

    public async getPendingByBusiness (businessId: string): Promise<any> {
        const result = appointments
            .filter(a => a.status === AppointmentStatus.Pending)
        return Promise.resolve([...result])
    }

    public create (appointment: any): Promise<any> {
        appointments.push(appointment)
        return Promise.resolve()
    }

    public decline (id: string): Promise<any> {
        const appointment = appointments.find(a => a.id === id)
        if (appointment) {
            appointment.status = AppointmentStatus.Declined
        }

        return Promise.resolve()
    }

    public accept (id: string): Promise<any> {
        const appointment = appointments.find(a => a.id === id)
        if (appointment) {
            appointment.status = AppointmentStatus.Accepted
        }

        return Promise.resolve()
    }

    public async getFreeSlotsByDay (
        businessId: string,
        date: Date,
        minIntervalLength: number,
        workdayStart: TimeModel,
        workdayEnd: TimeModel): Promise<any> {
        const appointments = await this.getUserAppointmentsByDay(businessId, date)

        if (!appointments || appointments.length === 0) {
            return [{
                start: { ...workdayStart },
                end: { ...workdayEnd }
            }]
        }

        let start = { ...workdayStart }
        const slots = []
        appointments.forEach(appointment => {
            const end = TimeHelper.getTime(appointment.start)
            const intervalLength = TimeHelper.calculateIntervalLength(start, end)
            if (intervalLength >= minIntervalLength) {
                slots.push({
                    start: { ...start },
                    end: end
                })
            }

            start = TimeHelper.addMinutes(start, appointment.durationInMinutes)
        })

        const lastIntervalLength = TimeHelper.calculateIntervalLength(start, workdayEnd)
        if (lastIntervalLength >= minIntervalLength) {
            slots.push({
                start: { ...start },
                end: { ...workdayEnd }
            })
        }

        return slots
    }

    private getUserAppointmentsByDay (businessId: string, date: Date): Promise<AppointmentModel[]> {
        const projection = QueryArgsHelper.build(
            AppointmentColumns.status,
            AppointmentColumns.durationInMinutes
        )
        const filter = {
            [AppointmentColumns.businessHolder]: businessId,
            [AppointmentColumns.start]: {
                $gte: DateExtensions.getDate(date),
                $let: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            }
        }

        return this.appointmentsData.filter(filter, projection, {
            sort: [AppointmentColumns.start]
        })
    }

}

export default new AppointmentService(new Repository<AppointmentModel>(Appointment))
