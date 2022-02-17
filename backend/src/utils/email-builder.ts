import { DateExtensions } from './date-extensions'

export const EmailBuilder = {
    acceptedAppointmentSubject: (businessType: string): string => {
        return `Your ${businessType} appointment was accepted.`
    },
    acceptedAppointmentBody: (appointment: any): string => {
        return `<div>
                    <h3>Your ${appointment.businessHolder.company.businessType.name} appointment was accepted.</h3>
                    <p>Start: ${DateExtensions.format(new Date(appointment.start))}</p>
                    <p>Duration: ${appointment.durationInMinutes}</p>
                    <p>Business owner: ${appointment.businessHolder.firstName} ${appointment.businessHolder.lastName}</p>
                    <p>Business holder contacts: ${appointment.businessHolder.email}, Tel: ${appointment.businessHolder.email}</p>
                    <p>Product: ${appointment.product.name}</p>
                </div>`
    },
    declinedAppointmentSubject: (businessType: string): string => {
        return `Your ${businessType} appointment was declined.`
    },
    declinedAppointmentBody: (appointment: any): string => {
        return `<div>
                    <h3>Your ${appointment.businessHolder.company.businessType.name} appointment was decelined.</h3>
                    <p>Start: ${DateExtensions.format(new Date(appointment.start))}</p>
                    <p>Duration: ${appointment.durationInMinutes}</p>
                    <p>Business owner: ${appointment.businessHolder.firstName} ${appointment.businessHolder.lastName}</p>
                    <p>Business holder contacts: ${appointment.businessHolder.email}, Tel: ${appointment.businessHolder.email}</p>
                    <p>Product: ${appointment.product.name}</p>
                </div>`
    }
}
