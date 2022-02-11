
import axios from 'axios';
import { toastHandler, TOAST_STATES } from '../helpers/toast';

export class RequestAPI {
    static get(endpoint) {
        return axios.get(process.env.REACT_APP_API_ENDPOINT + endpoint)
            .then(data => {
                return data.data;
            }).catch(error => {
                this.handleError(error)
            })
    }

    static post(endpoint, body = undefined) {
        return axios.post(process.env.REACT_APP_API_ENDPOINT + endpoint, body ? { ...body } : {})
            .then(data => {
                return data.data;
            }).catch(error => {
                this.handleError(error)
            })
    }

    static delete(endpoint) {
        return axios.delete(process.env.REACT_APP_API_ENDPOINT + endpoint)
            .then(data => {
                return data.data;
            }).catch(error => {
                this.handleError(error)
            })
    }

    static handleError(error) {
        this.userUnauthorized(error);
        this.cannotConnectToServer(error);
        this.notFound(error);
    }

    static userUnauthorized(error) {
        if (error.status === 401 || error.status === 440 || error.status === 422) {
            toastHandler({ success: TOAST_STATES.ERROR, message: error.message })
            throw new Error('Unauthorized: ' + error.message);
        }
    }

    static cannotConnectToServer = (error) => {
        if (error.status === 500) {
            toastHandler({ success: TOAST_STATES.ERROR, message: error.message })
            throw new Error('Internal server: ' + error.message)
        }
    }

    static notFound = (error) => {
        if (error.status === 404) {
            toastHandler({ success: TOAST_STATES.ERROR, message: error.message })
            throw new Error('Not found: ' + error.message)
        }
    }
}
