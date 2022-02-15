import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { Image, CardImage, Heart, HeartFill } from 'react-bootstrap-icons';

import Spinner from '../../components/common/Spinner/Spinner';
import CustomerSlide from '../../components/CustomerSlide/CustomerSlide';
import Service from '../../components/Service/Service';
import BusinessService from '../../services/businessService';
import classes from './CustomerPortal.module.scss';

const CustomerPortal = (props) => {
    const { chosenType } = useStoreState((state) => state.portalStore);
    const { setType } = useStoreActions((actions) => actions.portalStore);

    const [services, setServices] = useState([]);
    const [servicesTypes, setServicesTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect((e) => {
        if (chosenType) {
            loadData()
        } else {
            loadTypesData()
        }
    }, [chosenType]);

    const loadData = async () => {
        const res = await BusinessService.getAllByType(chosenType.id)
        setServices(res)
        setLoading(false)
    }

    const loadTypesData = async () => {
        const res = await BusinessService.getTypes()
        setServicesTypes(res)
    }

    const likeServiceHandler = async (service) => {
        const tempServices = [...services]
        if (service.addedToFavourites) {
            await BusinessService.deleteFavourite(service.id)
        } else {
            await BusinessService.addFavourite(service.id)
        }
        const tempService = tempServices.find(el => el.address === service.address)
        tempService.addedToFavourites = !tempService.addedToFavourites
        setServices(tempServices)
    }

    const loadType = ({ name, id }) => {
        setType({ name, id })
    }

    if (chosenType === null) {
        return (
            <div className={classes.CustomerSlide}>
                <div className={classes.Heading}>
                    <h1>Services</h1>
                    <p>Choose type of service</p>
                </div>
                <CustomerSlide services={servicesTypes.map((service, i) => <Service key={i}
                    caption={`Book a ${service.name} service`}
                    heading={service.name}
                    theme={classes.ServiceTheme}
                    icon={<Image />}
                    image={<CardImage />}
                    button={<button
                        onClick={() => loadType({ name: service.name, id: service.id })}>
                        Book now
                    </button>} />
                )} />
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
                    theme={classes.ServiceTheme}
                    button={<button id={service.id}>Details</button>}
                    additionalBtn={<button className={classes.LikeBtn}
                        onClick={() => likeServiceHandler(service)}>
                        {service.addedToFavourites ? <HeartFill className={classes.IconHeartFill} /> : <Heart />}
                    </button>} />)}
            </div>
        </div>
    )
}

export default CustomerPortal;