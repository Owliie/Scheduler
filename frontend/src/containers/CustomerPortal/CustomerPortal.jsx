import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { Image, CardImage } from 'react-bootstrap-icons';

import Spinner from '../../components/common/Spinner/Spinner';
import CustomerSlide from '../../components/CustomerSlide/CustomerSlide';
import Service from '../../components/Service/Service';
import BusinessService from '../../services/businessService';
import classes from './CustomerPortal.module.scss';

const CustomerPortal = (props) => {
    const { chosenType } = useStoreState((state) => state.portalStore);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (chosenType) {
            loadData()
        }
    }, [chosenType]);

    const loadData = async () => {
        const res = await BusinessService.getAllByType(chosenType)
        setServices(res)
        setLoading(false)
    }

    if (chosenType === null) {
        return (
            <div className={classes.CustomerSlide}>
                <div className={classes.Heading}>
                    <h1>Services</h1>
                    <p>Choose type of service</p>
                </div>
                <CustomerSlide />
            </div>
        )
    }

    if (services.length === 0 && loading) {
        return (<Spinner />)
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Heading}>
                <h1>{chosenType.name}</h1>
                <p>Choose a business</p>
            </div>
            <div className={classes.Services}>
                {services.map((service, i) => <Service key={i}
                    caption={service.address}
                    heading={service.description}
                    icon={<Image />}
                    image={<CardImage />}
                    button={<button id={service.id}>Details</button>} />)}
            </div>
        </div>
    )
}

export default CustomerPortal;