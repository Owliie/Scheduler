import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Sign from '../containers/Sign/Sign';
import Spinner from './common/Spinner/Spinner';
import Portal from '../containers/Portal/Portal';
import CustomerPortal from '../containers/CustomerPortal/CustomerPortal';
import BHolderPortal from '../containers/BHolderPortal/BHolderPortal';
import { useStoreState } from 'easy-peasy';
import { PORTALS } from '../utils/portals';

const RouteOptions = {
    GO_TO_SIGN: 'GO_TO_SIGN',
    GO_TO_CUSTOMER_PORTAL: 'GO_TO_CUSTOMER_PORTAL',
    GO_TO_BHOLDER_PORTAL: 'GO_TO_BHOLDER_PORTAL',
    GO_TO_PORTALS: 'GO_TO_PORTALS',
};

const Router = (props) => {
    const { isLoggedIn, account } = useStoreState((state) => state.userStore);

    const [routerAction, setRouterAction] = useState(null);

    useEffect(() => {
        setRouterAction(resolveNavigationRoute())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    const resolveNavigationRoute = () => {
        if (isLoggedIn !== null) {
            switch (true) {
                case !isLoggedIn:
                    return RouteOptions.GO_TO_SIGN;
                case !account?.isCustomer && !account?.chosenPortal:
                    return RouteOptions.GO_TO_PORTALS;
                case !account?.isCustomer && account?.chosenPortal === PORTALS.B_HOLDER:
                    return RouteOptions.GO_TO_BHOLDER_PORTAL;
                case account?.isCustomer:
                    return RouteOptions.GO_TO_CUSTOMER_PORTAL;
                default:
                    return RouteOptions.GO_TO_SIGN;
            }
        }
    };

    if (!routerAction) {
        return (<Spinner />)
    }

    if (routerAction) {
        switch (routerAction) {
            case RouteOptions.GO_TO_SIGN:
                return (
                    (
                        <Routes>
                            <Route path="/sign" element={<Sign />} />
                            <Route path="*" element={<Navigate to='/sign' />} />
                        </Routes>
                    )
                );
            case RouteOptions.GO_TO_PORTALS:
                return (
                    (
                        <Routes>
                            <Route path="/" exact element={<Portal />} />
                            <Route path="*" element={<Navigate to='/' />} />
                        </Routes>
                    )
                );
            case RouteOptions.GO_TO_BHOLDER_PORTAL:
                return (
                    (
                        <Routes>
                            <Route path="/" exact element={<BHolderPortal />} />
                            <Route path="*" element={<Navigate to='/' />} />
                        </Routes>
                    )
                );
            case RouteOptions.GO_TO_CUSTOMER_PORTAL:
                return (
                    (
                        <Routes>
                            <Route path="/" exact element={<CustomerPortal />} />
                            <Route path="*" element={<Navigate to='/' />} />
                        </Routes>
                    )
                );
            default:
                return (
                    (
                        <Routes>
                            <Route path='/' exact element={<Sign />} />
                            <Route path="*" element={<Navigate to='/sign' />} />
                        </Routes>
                    )
                );
        }
    }
}

export default Router;