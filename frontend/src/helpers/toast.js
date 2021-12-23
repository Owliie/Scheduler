import { toast } from 'react-toastify';

export const TOAST_STATES = {
    SUCCESS: 'success',
    ERROR: 'error',
    PENDING: 'pending'
}

export function toastHandler(result, component) {
    switch (result.success) {
        case TOAST_STATES.SUCCESS:
            toast.success(result.message);
            break;
        case TOAST_STATES.ERROR:
            toast.error(result.message);
            break;
        default:
            if (component) {
                toast.info(component);
            } else {
                toast.info(result.message);
            }
    }
}