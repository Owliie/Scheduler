import { AppointmentStatus } from '../models/enums/appointment-status'

const appointments = [
    {
        id: '6c9ef89f-d9b0-43c6-9aae-991022818847',
        start: '2022-01-29T14:00:00',
        end: '2022-01-29T15:00:00',
        service: 'Lady hairstyle',
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
        end: '2022-01-29T15:00:00',
        service: 'Children hairstyle',
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
        end: '2022-01-29T17:30:00',
        service: 'Gentleman hairstyle',
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
        end: '2022-01-29T17:30:00',
        service: 'Gentleman hairstyle',
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
        end: '2022-01-29T12:30:00',
        service: 'Gentleman hairstyle',
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
        end: '2022-01-29T10:30:00',
        service: 'Gentleman hairstyle',
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

}

export default new AppointmentService()
