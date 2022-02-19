import { RequestAPI } from "./baseApi";

class AppointmentService {
    static book = (data) => {
        return RequestAPI.post('/appointments', { ...data })
    }

    static getBooked = () => {
        return RequestAPI.get('/appointments/upcoming')
    }

    static acceptAppointment = (id) => {
        return RequestAPI.post(`/appointments/accept/${id}`)
    }

    static rejectAppointment = (id) => {
        return RequestAPI.post(`/appointments/decline/${id}`)
    }

    static editAppointment = (id, edited) => {
        return RequestAPI.put(`/appointments/${id}`, { ...edited })
    }
}

export default AppointmentService;