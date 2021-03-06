import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { BellFill, Check2Circle, HourglassSplit } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

import Spinner from '../../components/common/Spinner/Spinner';
import CustomerSlide from '../../components/CustomerSlide/CustomerSlide';
import Service from '../../components/Service/Service';
import AppointmentService from '../../services/appointmentService';
import { STATUS } from '../../utils/status';
// import  from '../../assets/';

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
        return AppointmentService.getBooked()
    }

    const setData = async (pendingData) => {
        const data = await pendingData
        const tempServices = {}
        data.forEach(service => {
            const type = service.businessHolder.company.businessType
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
                            caption={service.businessHolder.company.address}
                            heading={`${service.product.name} - $${service.product.price}`}
                            icon={service.status === STATUS.PENDING ? <HourglassSplit className={classes.StatusIcon} /> : <Check2Circle className={classes.StatusIcon} />}
                            theme={classes.ServiceTheme}
                            image={`/assets/${service?.businessHolder.company.businessType.imagePath.split('/').slice(-1)[0]}`}
                            button={<button id={service.id}
                                onClick={() => navigate('/book', { state: { id: service.businessHolder.id } })}
                            >Details</button>}
                            additionalBtn={
                                <Badge className={classes.Badge}>
                                    <BellFill /> {new Date(service.start).toLocaleString()}
                                </Badge>
                            }
                        />)} />
                    </div>
                    : null
            )
            }
        </div >
    )
}

export default Booked;