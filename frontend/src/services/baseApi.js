
import axios from 'axios';
import { StoreProvider } from 'easy-peasy';
import { toastHandler, TOAST_STATES } from '../helpers/toast';
import store from '../store/index';
import { RESPONSE_STATUS } from '../utils/status';
export class RequestAPI {
    static get(endpoint) {
        this.auth()
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
                this.handleSuccess(data.data)
                return data.data;
            }).catch(error => {
                this.handleError(error)
            })
    }

    static put(endpoint, body = undefined) {
        return axios.put(process.env.REACT_APP_API_ENDPOINT + endpoint, body ? { ...body } : {})
            .then(data => {
                this.handleSuccess(data.data)
                return data.data;
            }).catch(error => {
                this.handleError(error)
            })
    }

    static delete(endpoint) {
        return axios.delete(process.env.REACT_APP_API_ENDPOINT + endpoint)
            .then(data => {
                this.handleSuccess(data.data)
                return data.data;
            }).catch(error => {
                this.handleError(error)
            })
    }

    static handleSuccess(data) {
        if (data && data.status === RESPONSE_STATUS.SUCCESS && data.message) {
            toastHandler({ success: TOAST_STATES.SUCCESS, message: data.message })
        }
    }

    static handleError(error) {
        const data = error.response.data
        this.userUnauthorized(data);
        this.cannotConnectToServer(data);
        this.notFound(data);
    }

    static userUnauthorized(error) {
        if (error.status === RESPONSE_STATUS.VALIDATION_ERROR) {
            toastHandler({ success: TOAST_STATES.ERROR, message: error.message })
        }
    }

    static genericError = (error) => {
        if (error.status !== RESPONSE_STATUS.VALIDATION_ERROR) {
            toastHandler({ success: TOAST_STATES.ERROR, message: error.message })
        }
    }

    static auth = () => {
        const token = store.getState().userStore.account?.token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}
