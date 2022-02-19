import { action, thunk } from 'easy-peasy';
import UserService from '../../services/userService';
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
            state.account.isCustomer = payload.roles.length === 0 // only b holders have roles
        }
        state.isLoggedIn = !!(payload && payload.token);
    }),
    /**
     * THUNKS
     */
    registerCustomer: thunk(async (actions, payload, { getState, getStoreState }) => {
        const { portalStore } = getStoreState();
        const data = await UserService.registerCustomer(payload)

        portalStore.chosenPortal = data.roles ? null : PORTALS.CUSTOMER;
        actions.setAccount(data);
    }),
    registerBusinessHolder: thunk(async (actions, payload, { getState, getStoreState }) => {
        const { portalStore } = getStoreState();
        const data = await UserService.registerBusinessHolder(payload)

        portalStore.chosenPortal = data.roles ? null : PORTALS.CUSTOMER;
        actions.setAccount(data);
    }),
    login: thunk(async (actions, payload, { getState, getStoreState }) => {
        const { portalStore } = getStoreState();
        const data = await UserService.login(payload)

        portalStore.chosenPortal = data.roles.length > 0 ? null : PORTALS.CUSTOMER;
        actions.setAccount(data);
    }),
    logout: thunk((actions, payload, { getState, getStoreState }) => {
        const { portalStore } = getStoreState();

        portalStore.chosenPortal = null;
        portalStore.chosenType = null;
        actions.setAccount(null);
    })
};
