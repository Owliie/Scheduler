import { action } from 'easy-peasy';

export const portalStore = {
    /**
     * STATE
     */
    chosenPortal: null,
    chosenType: '',
    /**
     * ACTIONS
     */
    setPortal: action((state, payload) => {
        state.chosenPortal = payload
    }),
    setType: action((state, payload) => {
        state.chosenType = payload;
    })
};
