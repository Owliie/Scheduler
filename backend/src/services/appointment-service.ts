import { AppointmentStatus } from '../models/enums/appointment-status'
import { QueryArgsHelper } from '../utils/query-args-helper'
import { AppointmentColumns } from '../data/models/appointment-columns'
import { Repository } from '../data/repositories'
import { AppointmentModel } from '../models/appointment-model'
import { TimeModel } from '../models/common/time-model'
import { TimeHelper } from '../utils/time-helper'
import { Appointment } from '../data/models'
import { DateExtensions } from '../utils/date-extensions'
import { TaskResult } from '../common/taskResult'
import { AvailabilityModel } from '../models/availability-model'
import { ObjectId } from 'mongodb'
import { ModelHelpers } from '../utils/model-helpers'
import { TimeInterval } from '../models/common/time-interval'
import { ProductColumns } from '../data/models/product-columns'
import { CompanyColumns, UserColumns } from '../data/models/user-columns'

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

    public create (appointment: any): Promise<TaskResult> {
        return this.appointmentsData.create(appointment)
            .then(appointment => TaskResult.success('The appointment was created successfully', appointment))
            .catch((err) => TaskResult.failure('Error while saving the appointment', err))
    }

    public async validateAppointment (appointment: AppointmentModel, dayAvailability: AvailabilityModel): Promise<TaskResult> {
        const freeSlots = await this.getFreeSlotsByDay(
            appointment.businessHolder,
            new Date(appointment.start),
            appointment.durationInMinutes,
            ModelHelpers.getAvailabilityStart(dayAvailability),
            ModelHelpers.getAvailabilityEnd(dayAvailability)
        )

        const appointmentInterval = TimeHelper.buildInterval(new Date(appointment.start), appointment.durationInMinutes)
        if (freeSlots.some(s => TimeHelper.contains(s, appointmentInterval))) {
            return TaskResult.success('The appointment start is valid.')
        }

        return TaskResult.failure('The selected time slot is not free.')
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

    public async getUpcomingForUser (userId: string): Promise<any> {
        const complexPopulate = [
            {
                path: AppointmentColumns.businessHolder,
                select: QueryArgsHelper.build(
                    UserColumns.firstName,
                    UserColumns.lastName,
                    UserColumns.email,
                    UserColumns.phone,
                    QueryArgsHelper.combine(UserColumns.company, CompanyColumns.description),
                    QueryArgsHelper.combine(UserColumns.company, CompanyColumns.address)
                ),
                populate: {
                    path: QueryArgsHelper.combine(UserColumns.company, CompanyColumns.businessType)
                }
            },
            {
                path: AppointmentColumns.product,
                select: QueryArgsHelper.build(
                    ProductColumns.name,
                    ProductColumns.price
                )
            }
        ]
        const projection = QueryArgsHelper.build(
            AppointmentColumns.createdOn,
            AppointmentColumns.status,
            AppointmentColumns.start,
            AppointmentColumns.durationInMinutes
        )
        const filter = {
            [AppointmentColumns.client]: userId,
            [AppointmentColumns.start]: {
                $gt: Date.now()
            },
            [AppointmentColumns.status]: {
                $in: [AppointmentStatus.Accepted, AppointmentStatus.Pending]
            }
        }

        return this.appointmentsData.filter(filter, projection, {
            complexPopulate,
            sort: AppointmentColumns.start
        })
    }

    public async getFreeSlotsByDay (
        businessId: string | ObjectId,
        date: Date,
        minIntervalLength: number,
        workdayStart: TimeModel,
        workdayEnd: TimeModel): Promise<TimeInterval[]> {
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

            start = TimeHelper.addMinutes(end, appointment.durationInMinutes)
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

    private getUserAppointmentsByDay (businessId: string | ObjectId, date: Date): Promise<AppointmentModel[]> {
        const projection = QueryArgsHelper.build(
            AppointmentColumns.start,
            AppointmentColumns.durationInMinutes
        )
        const filter = {
            [AppointmentColumns.businessHolder]: businessId,
            [AppointmentColumns.start]: {
                $gte: DateExtensions.getDate(date),
                $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            }
        }

        return this.appointmentsData.filter(filter, projection, {
            sort: AppointmentColumns.start
        })
    }

}

export default new AppointmentService(new Repository<AppointmentModel>(Appointment))
