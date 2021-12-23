
import axios from 'axios';

export class RequestAPI {
    static get(endpoint) {
        axios.post(process.env.REACT_APP_API_ENDPOINT + endpoint,)
            .then(data => {
                return data;
            }).catch(error => {
                this.handleError(error)
            })
    }

    static post(endpoint, body = undefined) {
        axios.post(process.env.REACT_APP_API_ENDPOINT + endpoint, body ? { ...body } : {})
            .then(data => {
                return data;
            }).catch(error => {
                this.handleError(error)
            })
    }

    static handleError(error) {
        this.userUnauthorized(error);
        this.cannotConnectToServer(error);
    }

    static userUnauthorized(error) {
        // add toast notification
        if (error.status === 401 || error.status === 440 || error.status === 422) {
            throw new Error('Unauthorized: ' + error.message);
        }
    }

    cannotConnectToServer(error) {
        // add toast notification
        if (error.status === 500) {
            throw new Error('Internal server: ' + error.message)
        }
    }
}
