import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import Spinner from '../../components/common/Spinner/Spinner';
import CustomerSlide from '../../components/CustomerSlide/CustomerSlide';
import classes from './CustomerPortal.module.scss';

const CustomerPortal = (props) => {
    const { chosenType } = useStoreState((state) => state.portalStore);
    const { setType } = useStoreActions((actions) => actions.portalStore);

    if (chosenType == null) {
        return (<Spinner />)
    }

    if (!chosenType) {
        return (
            <div className={classes.CustomerSlide}>
                <h1>Services</h1>
                <p>Choose type of service</p>
                <CustomerSlide />
            </div>
        )
    }

    return (
        <div>Services:</div>
    )
}

export default CustomerPortal;