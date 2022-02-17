import { RequestAPI } from "./baseApi";

class ProductService {
    static getAll = () => {
        return RequestAPI.get('/products')
    }

    static getByBusiness = (id) => {
        return RequestAPI.get(`/businesses/products/${id}`)
    }

    static create = (data) => {
        return RequestAPI.post('/products', data)
    }

    static update = (id, data) => {
        return RequestAPI.put(`/products/${id}`, data)
    }

    static delete = (id) => {
        return RequestAPI.delete(`/products/${id}`)
    }
}

export default ProductService;