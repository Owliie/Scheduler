import { RequestAPI } from "./baseApi";

class BusinessService {
    static getTypes = () => {
        return RequestAPI.get('/businessTypes')
    }

    static getAllByType = (id) => {
        return RequestAPI.get(`/businesses/byType/${id}`)
    }

    static getById = (id) => {
        return RequestAPI.get(`/businesses/${id}`)
    }

    static getAvailability = (id, date) => {
        return RequestAPI.get(`/businesses/freeSlots/${id}?date=${date}`)
    }

    static getFavourites = () => {
        return RequestAPI.get('/users/favourites')
    }

    static deleteFavourite = (id) => {
        return RequestAPI.delete(`/users/favourites/${id}`)
    }

    static addFavourite = (businessId) => {
        return RequestAPI.post('/users/favourites', { businessId })
    }

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

    static getSchedule = (date) => {
        return RequestAPI.get(`/businesses/schedule?date=${date}`)
    }
}

export default BusinessService;