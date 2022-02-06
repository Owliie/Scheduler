import { useStoreActions } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { CaretLeftFill, CaretRightFill, Image, CardImage } from 'react-bootstrap-icons';

import BusinessService from '../../services/businessService';
import Spinner from '../common/Spinner/Spinner';
import Service from '../Service/Service';
import classes from './CustomerSlide.module.scss';

const CustomerSlide = (props) => {
    const { setType } = useStoreActions((actions) => actions.portalStore);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await BusinessService.getTypes();
        prepareData(res)
        setServices(prepareData(res))
        setLoading(false)
    }

    const prepareData = (data) => {
        const preppedData = []

        for (let i = 0; i < data.length; i += 3) {
            preppedData.push(data.slice(i, i + 3))
        }

        return preppedData
    }

    const loadType = (e) => {
        const obj = e.target.dataset
        setType({ name: obj.name, id: obj.id })
    }

    const nextPage = () => {
        if (pageIndex < services.length - 1) {
            setPageIndex(pageIndex + 1);
        }
    }

    const prevPage = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1)
        }
    }

    if (services.length === 0 && loading) {
        return <Spinner />
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Slider}>
                <button onClick={prevPage} disabled={pageIndex === 0}><CaretLeftFill size={25} className={classes.Arrow} /></button>
                <div className={classes.Page}>
                    {services[pageIndex].map((service, j) => <Service key={pageIndex + '' + j}
                        caption={`Book a ${service.name} service`}
                        heading={service.name}
                        icon={<Image />}
                        image={<CardImage />}
                        button={<button
                            onClick={loadType}
                            data-id={service.id}
                            data-name={service.name}>Book now</button>} />
                    )}
                </div>
                <button disabled={pageIndex === services.length - 1} onClick={nextPage}><CaretRightFill size={25} className={classes.Arrow} /></button>
            </div>
        </div>
    )
}

export default CustomerSlide;