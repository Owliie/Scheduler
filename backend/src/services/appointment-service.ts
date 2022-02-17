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

class AppointmentService {

    private appointmentsData: Repository<AppointmentModel>

    public constructor (appointmentsData: Repository<AppointmentModel>) {
        this.appointmentsData = appointmentsData
    }

    public async getAppointmentsByBusinessAndDate (businessId: string, date: Date): Promise<any> {
        const complexPopulate = [
            {
                path: AppointmentColumns.client,
                select: QueryArgsHelper.build(
                    UserColumns.firstName,
                    UserColumns.lastName,
                    UserColumns.email,
                    UserColumns.phone
                )
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
            [AppointmentColumns.businessHolder]: businessId,
            [AppointmentColumns.start]: {
                $gte: DateExtensions.getDate(date),
                $lt: DateExtensions.nextDate(date)
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

    public decline (id: string): Promise<TaskResult> {
        return this.appointmentsData.update(id, { [AppointmentColumns.status]: AppointmentStatus.Declined })
            .then(() => TaskResult.success('The appointment is successfully declined.'))
            .catch(() => TaskResult.failure('Error while declining the appointment.'))
    }

    public accept (id: string): Promise<any> {
        return this.appointmentsData.update(id, { [AppointmentColumns.status]: AppointmentStatus.Accepted })
            .then(() => TaskResult.success('The appointment is successfully accepted.'))
            .catch(() => TaskResult.failure('Error while accepting the appointment.'))
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
                $lt: DateExtensions.nextDate(date)
            },
            [AppointmentColumns.status]: {
                $in: [AppointmentStatus.Accepted, AppointmentStatus.Pending]
            }
        }

        return this.appointmentsData.filter(filter, projection, {
            sort: AppointmentColumns.start
        })
    }

}

export default new AppointmentService(new Repository<AppointmentModel>(Appointment))
