import { action } from 'easy-peasy';

export const userStore = {
    /**
     * STATE
     */
    isLoggedIn: false,
    loading: true,
    account: null,

    /**
     * ACTIONS
     */
    setAccount: action((state, payload) => {
        state.account = payload;
        state.isLoggedIn = true;
    }),
    setWalletConnectionLoading: action((state, payload) => {
        state.loading = payload;
    }),

    /**
     * THUNKS
     */
    // add thunks for dispatching actions
};
