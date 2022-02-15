import React, { useEffect, useState } from 'react';
import { CardImage, HeartFill, Image } from 'react-bootstrap-icons';
import Spinner from '../../components/common/Spinner/Spinner';
import CustomerSlide from '../../components/CustomerSlide/CustomerSlide';
import Service from '../../components/Service/Service';
import BusinessService from '../../services/businessService';

import classes from './Favorites.module.scss';

const Favorites = () => {
    const [services, setServices] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect((e) => {
        const data = loadData()
        setData(data)
    }, []);

    const likeServiceHandler = async (service) => {
        await BusinessService.deleteFavourite(service.id)
        let tempServices = JSON.parse(JSON.stringify(services))

        Object.keys(tempServices).forEach(key => {
            const found = tempServices[key].findIndex(el => el.id === service.id)
            if (found !== -1) {
                tempServices[key].splice(found, 1);
            }
        })

        setServices(tempServices)
    }

    const loadData = async () => {
        return await BusinessService.getFavourites()
    }

    const setData = async (pendingData) => {
        const data = await pendingData
        const tempServices = {}

        data.forEach(service => service.company.businessTypes.forEach(type => {
            if (!!tempServices[type.name] === false) {
                tempServices[type.name] = []
            }

            tempServices[type.name].push(service)
        }))

        setServices(tempServices)
        setLoading(false)
    }

    if (Object.keys(services).length === 0 && loading) {
        return (<Spinner />)
    }

    console.log('services', services);
    return (
        <div className={classes.Container}>
            <div className={classes.Heading}>
                <h1>Favorites</h1>
                <p>Choose a business</p>
            </div>
            {Object.keys(services).map(key =>
                services[key].length > 0 ?
                    <div key={key}>
                        <hr />
                        <div className={classes.BusinessType}>{key}</div>
                        <CustomerSlide services={services[key].map((service, i) => <Service key={i}
                            caption={service.company.address}
                            heading={service.company.description}
                            icon={<Image />}
                            image={<CardImage />}
                            button={<button id={service.id}>Details</button>}
                            additionalBtn={<button className={classes.LikeBtn}
                                onClick={() => likeServiceHandler(service)}>
                                <HeartFill className={classes.IconHeartFill} />
                            </button>} />)} />
                    </div>
                    : null
            )
            }
        </div>
    )
}

export default Favorites;