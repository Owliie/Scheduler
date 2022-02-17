import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { BellFill, CardImage, Image } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

import Spinner from '../../components/common/Spinner/Spinner';
import CustomerSlide from '../../components/CustomerSlide/CustomerSlide';
import Service from '../../components/Service/Service';
import BusinessService from '../../services/businessService';

import classes from './Booked.module.scss';

const Booked = () => {
    const [services, setServices] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect((e) => {
        const data = loadData()
        setData(data)
    }, []);

    const loadData = () => {
        return BusinessService.getBooked()
    }

    const setData = async (pendingData) => {
        const data = await pendingData
        const tempServices = {}
        data.forEach(service => {
            // TODO const type = service.company.businessType
            const type = { name: 'type' }
            if (!!tempServices[type.name] === false) {
                tempServices[type.name] = []
            }

            tempServices[type.name].push(service)
        })

        setServices(tempServices)
        setLoading(false)
    }

    if (Object.keys(services).length === 0 && loading) {
        return (<Spinner />)
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Heading}>
                <h1>Booked</h1>
                <p>Choose a business</p>
            </div>
            {Object.keys(services).map(key =>
                services[key].length > 0 ?
                    <div key={key}>
                        <hr />
                        <div className={classes.BusinessType}>{key}</div>
                        <CustomerSlide services={services[key].map((service, i) => <Service key={i}
                            caption={service.businessHolder.address}
                            heading={service.product}
                            icon={<Image />}
                            theme={classes.ServiceTheme}
                            image={<CardImage />}
                            button={<button id={service.id}
                                onClick={() => navigate('/book', { state: { id: service.id } })}
                            >Details</button>}
                            additionalBtn={<Badge className={classes.Badge}><BellFill /> {new Date(service.start).toLocaleString()}</Badge>}
                        />)} />
                    </div>
                    : null
            )
            }
        </div >
    )
}

export default Booked;