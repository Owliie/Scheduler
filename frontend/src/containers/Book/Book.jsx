import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { Badge, Form } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

import ProductService from '../../services/productService';
import BusinessService from '../../services/businessService';
import classes from './Book.module.scss';

const Book = (props) => {
    const { account } = useStoreState((state) => state.userStore);

    const [products, setProducts] = useState([]);
    const [minDate, setMinDate] = useState();
    const [availability, setAvailability] = useState([]);
    const [timeLimit, setTimeLimit] = useState({});
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        // TODO get products by profile id
        loadProducts()
        loadMinDate()
    }, []);

    const loadProducts = async () => {
        const productsRes = await ProductService.getByBusiness(props.id)
        setProducts(productsRes)
    }

    const dateHandler = async (e) => {
        const tempDate = e.target.value
        const res = await BusinessService.getAvailability(props.id, tempDate)

        setDate(tempDate)
        setAvailability(res)
    }

    const timeHandler = async () => {
        const selectedDate = date + 'T' + time
        const foundType = products.find(product => product.id === type)

        await BusinessService.book({
            businessHolder: props.id,
            start: selectedDate,
            durationInMinutes: foundType.durationInMinutes,
            product: foundType.id
        })
    }

    const loadMinDate = () => {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var minDate = year + '-' + month + '-' + day;
        setMinDate(minDate)
    }

    const convertToTime = (hour, minute) => {
        let strTime = ''
        if (+hour < 10) {
            strTime += '0'
        }
        strTime += hour + ':'

        if (+minute < 10) {
            strTime += '0'
        }
        strTime += minute

        return strTime
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Heading}>
                <h1>{account.firstName + ' ' + account.lastName}</h1>
                <p>Service details</p>
            </div>

            <div className={classes.Details}>
                <div>
                    <h4>Description</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div>
                    <h4>Place</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
            <div className={classes.Form}>
                <div>
                    <Badge pill className={!type ? classes.Active : null}>1</Badge>
                    <Form.Select className={classes.SelectForm} onChange={(e) => setType(e.target.value)} aria-label="Select business type">
                        <option value=''>Type</option>
                        {products.map(type =>
                            <option key={type.id} value={type.id}>{type.name} - ${type.price}</option>
                        )}
                    </Form.Select>
                </div>
                <div>
                    <Badge pill className={!date && type ? classes.Active : null}>2</Badge>
                    <input onChange={dateHandler} type='date' min={minDate} />
                </div>
                <div className={classes.Time}>
                    <div>
                        <Badge pill className={!time && type && date ? classes.Active : null}>3</Badge>
                        <div>
                            <form onSubmit={timeHandler}>
                                <input disabled={!timeLimit.min} min={timeLimit.min} max={timeLimit.max} onChange={(e) => setTime(e.target.value)} type='time' />
                                <button type='submit' className={classes.BookBtn}><Plus />Book</button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <Form>
                            {availability.map((hours, i) =>
                                <Form.Check
                                    type='radio'
                                    key={i}
                                    label={`${convertToTime(hours.start.hour, hours.start.minute)} - ${convertToTime(hours.end.hour, hours.end.minute)}`}
                                    onClick={() => setTimeLimit({
                                        min: convertToTime(hours.start.hour, hours.start.minute),
                                        max: convertToTime(hours.end.hour, hours.end.minute)
                                    })}
                                />
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Book;