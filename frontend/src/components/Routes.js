import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Sign from '../containers/Sign/Sign';
import Spinner from './common/Spinner/Spinner';
import Dashboard from '../containers/Dashboard/Dashboard';
import { useStoreState } from 'easy-peasy';

const RouteOptions = {
    GO_TO_SIGN: 'GO_TO_SIGN',
    GO_TO_HOME: 'GO_TO_HOME',
};

const Router = (props) => {
    const { isLoggedIn } = useStoreState((state) => state.userStore);

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
                case isLoggedIn:
                    return RouteOptions.GO_TO_HOME;
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
            case RouteOptions.GO_TO_HOME:
                return (
                    (
                        <Routes>
                            <Route path="/" exact element={<Dashboard />} />
                            <Route path="*" element={<Navigate to='/' />} />
                        </Routes>
                    )
                );
            default:
                return (
                    (
                        <Routes>
                            <Route path='/' exact element={<Dashboard />} />
                            <Route path="*" element={<Navigate to='/sign' />} />
                        </Routes>
                    )
                );
        }
    }
}

export default Router;