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
}

export default UserService;