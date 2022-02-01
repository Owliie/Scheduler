import { action, thunk } from 'easy-peasy';
import SignService from '../../services/signService';

export const userStore = {
    /**
     * STATE
     */
    isLoggedIn: null,
    account: null,
    /**
     * ACTIONS
     */
    setAccount: action((state, payload) => {
        state.account = payload;
        state.isLoggedIn = !!(payload && payload.token);
    }),
    /**
     * THUNKS
     */
    registerCustomer: thunk(async (actions, payload, { getState }) => {
        const data = await SignService.registerCustomer(payload)
        actions.setAccount(data);
    }),
    registerBusinessHolder: thunk(async (actions, payload) => {
        const data = await SignService.registerBusinessHolder(payload)
        actions.setAccount(data);
    }),
    login: thunk(async (actions, payload) => {
        const data = await SignService.login(payload)
        actions.setAccount(data);
    })
};
