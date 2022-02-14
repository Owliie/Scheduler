import { action, thunk } from 'easy-peasy';
import SignService from '../../services/signService';
import { PORTALS } from '../../utils/portals';

export const userStore = {
    /**
     * STATE
     */
    isLoggedIn: false,
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
        const { portalStore } = getStoreState();
        const data = await SignService.registerCustomer(payload)

        portalStore.chosenPortal = data.roles ? null : PORTALS.CUSTOMER;
        actions.setAccount(data);
    }),
    registerBusinessHolder: thunk(async (actions, payload, { getState, getStoreState }) => {
        const { portalStore } = getStoreState();
        const data = await SignService.registerBusinessHolder(payload)

        portalStore.chosenPortal = data.roles ? null : PORTALS.CUSTOMER;
        actions.setAccount(data);
    }),
    login: thunk(async (actions, payload, { getState, getStoreState }) => {
        const { portalStore } = getStoreState();
        const data = await SignService.login(payload)

        portalStore.chosenPortal = data.roles ? null : PORTALS.CUSTOMER;
        actions.setAccount(data);
    }),
    logout: thunk((actions, payload, { getState, getStoreState }) => {
        const { portalStore } = getStoreState();

        portalStore.chosenPortal = null;
        portalStore.chosenType = null;
        actions.setAccount(null);
    })
};
