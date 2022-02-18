import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { useLocation, useNavigate } from 'react-router';

import Sign from '../containers/Sign/Sign';
import Spinner from './common/Spinner/Spinner';
import Portal from '../containers/Portal/Portal';
import CustomerPortal from '../containers/CustomerPortal/CustomerPortal';
import BHolderPortal from '../containers/BHolderPortal/BHolderPortal';
import { PORTALS } from '../utils/portals';
import Favorites from '../containers/Favorites/Favorites';
import BusinessManagement from '../containers/BusinessManagement/BusinessManagement';
import Book from '../containers/Book/Book';
import Booked from '../containers/Booked/Booked';

const RouteOptions = {
    GO_TO_SIGN: 'GO_TO_SIGN',
    GO_TO_FAVORITES: 'GO_TO_FAVORITES',
    GO_TO_CUSTOMER_PORTAL: 'GO_TO_CUSTOMER_PORTAL',
    GO_TO_BHOLDER_PORTAL: 'GO_TO_BHOLDER_PORTAL',
    GO_TO_PORTALS: 'GO_TO_PORTALS',
};

const Router = (props) => {
    const { isLoggedIn, account } = useStoreState((state) => state.userStore);
    const { chosenPortal } = useStoreState((state) => state.portalStore);

    const [routerAction, setRouterAction] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setRouterAction(resolveNavigationRoute())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, chosenPortal]);

    useEffect(() => {
        if ('#' + location.pathname !== window.location.hash) {
            navigate(location.pathname)
        }
    }, [location.pathname]);

    const resolveNavigationRoute = () => {
        switch (true) {
            case !isLoggedIn:
                return RouteOptions.GO_TO_SIGN;
            case account && !account.isCustomer && !chosenPortal:
                return RouteOptions.GO_TO_PORTALS;
            case account && !account.isCustomer && chosenPortal === PORTALS.B_HOLDER:
                return RouteOptions.GO_TO_BHOLDER_PORTAL;
            case account && (account.isCustomer || chosenPortal === PORTALS.CUSTOMER):
                return RouteOptions.GO_TO_CUSTOMER_PORTAL;
            default:
                return RouteOptions.GO_TO_SIGN;
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
                            <Route path="/management" exact element={<BusinessManagement />} />
                            <Route path="*" element={<Navigate to='/' />} />
                        </Routes>
                    )
                );
            case RouteOptions.GO_TO_CUSTOMER_PORTAL:
                return (
                    (
                        <Routes>
                            <Route path="/" exact element={<CustomerPortal />} />
                            <Route path="/book" exact element={<Book id={location.state?.id} />} />
                            <Route path="/favorites" exact element={<Favorites />} />
                            <Route path="/booked" exact element={<Booked />} />
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