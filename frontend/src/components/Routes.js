import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Sign from '../containers/Sign/Sign';
import Spinner from './Spinner/Spinner';
import Dashboard from '../containers/Dashboard/Dashboard';

const RouteOptions = {
    GO_TO_SIGN: 'GO_TO_SIGN',
    GO_TO_HOME: 'GO_TO_HOME',
};

const Router = (props) => {
    const [routerAction, setRouterAction] = useState(null);

    useEffect(() => {
        setRouterAction(RouteOptions.GO_TO_SIGN)
    }, []);

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
                            <Route path="/" element={<Dashboard />} />
                            <Route path="*" element={<Navigate to='/sign' />} />
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