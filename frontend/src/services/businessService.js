import { RequestAPI } from "./baseApi";

class BusinessService {
    static getTypes = () => {
        return RequestAPI.get('/businessTypes')
    }

    static getAllByType = (id) => {
        return RequestAPI.get('/businesses/byType/' + id)
    }

    static getFavourites = (id) => {
        return RequestAPI.get('/users/favourites/' + id)
    }

    static addFavourite = (businessId) => {
        return RequestAPI.post('/users/favourites', businessId)
    }
}

export default BusinessService;