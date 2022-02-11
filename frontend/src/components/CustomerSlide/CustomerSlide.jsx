import React, { useEffect, useState } from 'react';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';

import Spinner from '../common/Spinner/Spinner';
import classes from './CustomerSlide.module.scss';

const CustomerSlide = (props) => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        loadData();
    }, [props]);

    useEffect(() => {
    }, [services]);

    const loadData = () => {
        setServices(prepareData(props.services))
        setLoading(false)
    }

    const prepareData = (data) => {
        const preppedData = []

        for (let i = 0; i < data.length; i += 3) {
            preppedData.push(data.slice(i, i + 3))
        }

        return preppedData
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
                    {services[pageIndex]}
                </div>
                <button disabled={pageIndex === services.length - 1} onClick={nextPage}><CaretRightFill size={25} className={classes.Arrow} /></button>
            </div>
        </div>
    )
}

export default CustomerSlide;