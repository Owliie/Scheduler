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

    static getSchedule = (date) => {
        return RequestAPI.get(`/businesses/schedule?date=${date}`)
    }
}

export default BusinessService;