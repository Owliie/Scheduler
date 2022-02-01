import { RequestAPI } from "./baseApi";

class SignService {
    static login = (data) => {
        return RequestAPI.post('/users/login', data)
    }

    static registerCustomer = (data) => {
        return RequestAPI.post('/users/register', { ...data })
    }

    static registerBusinessHolder = (data) => {
        return RequestAPI.post('/users/register?type=BusinessHolder', { ...data })
    }
}

export default SignService;