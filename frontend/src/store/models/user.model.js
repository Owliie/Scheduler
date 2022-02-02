import { action, thunk } from 'easy-peasy';
import SignService from '../../services/signService';
import { PORTALS } from '../../utils/portals';

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
        if (state.account) {
            state.account.isCustomer = !payload.roles // only b holders have roles
            state.account.chosenPortal = payload.roles ? null : PORTALS.CUSTOMER;
        }
        state.isLoggedIn = !!(payload && payload.token);
    }),
    setPortal: action((state, payload) => {
        state.account.chosenPortal = payload;
    }),
    /**
     * THUNKS
     */
    registerCustomer: thunk(async (actions, payload, { getState, getStoreState }) => {
        const { portal } = getStoreState().portalStore;
        const data = await SignService.registerCustomer(payload)

        portal.chosenPortal = data.roles ? null : PORTALS.CUSTOMER;
        actions.setAccount(data);
    }),
    registerBusinessHolder: thunk(async (actions, payload, { getState, getStoreState }) => {
        const { portal } = getStoreState().portalStore;
        const data = await SignService.registerBusinessHolder(payload)

        portal.chosenPortal = data.roles ? null : PORTALS.CUSTOMER;
        actions.setAccount(data);
    }),
    login: thunk(async (actions, payload, { getState, getStoreState }) => {
        const { portal } = getStoreState().portalStore;
        const data = await SignService.login(payload)

        portal.chosenPortal = data.roles ? null : PORTALS.CUSTOMER;
        actions.setAccount(data);
    })
};
