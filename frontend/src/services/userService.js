import { RequestAPI } from "./baseApi";

class UserService {
    static login = (data) => {
        return RequestAPI.post('/users/login', data)
    }

    static registerCustomer = (data) => {
        return RequestAPI.post('/users/register', data)
    }

    static registerBusinessHolder = (data) => {
        return RequestAPI.post('/users/register?type=BusinessHolder', data)
    }

    static setBusinessType = (data) => {
        return RequestAPI.post('/users/profile/businessType', { data })
    }

    static getProfile = () => {
        return RequestAPI.get('/users/profile')
    }

    static setAvailability = (availability) => {
        return RequestAPI.post('/users/profile/availability', { availability })
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
}

export default UserService;