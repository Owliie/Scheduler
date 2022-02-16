import { useStoreState } from 'easy-peasy';
import React, { useEffect, useRef, useState } from 'react';
import { Accordion, Badge, Form } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

import ProductService from '../../services/productService';
import classes from './Book.module.scss';

const Book = (props) => {
    const { account } = useStoreState((state) => state.userStore);

    // for fetching bholder data
    const [profileId, setProfileId] = useState(null);
    const [products, setProducts] = useState([]);
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        setProfileId(props.id)

        // TODO get products by profile id
        loadProducts()
    }, []);

    const loadProducts = async () => {
        const res = await ProductService.getAll()
        setProducts(res)
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
                            <option key={type.id} value={type.id}>{type.name}</option>
                        )}
                    </Form.Select>
                </div>
                <div>
                    <Badge pill className={!date && type ? classes.Active : null}>2</Badge>
                    <input onChange={(e) => setDate(e.target.value)} type='date' />
                </div>
                <div>
                    <Badge pill className={!time && type && date ? classes.Active : null}>3</Badge>
                    <input onChange={(e) => setTime(e.target.value)} type='time' />
                </div>
                <div>
                    <button className={classes.BookBtn}><Plus />Book</button>
                </div>
            </div>
        </div>
    )
}

export default Book;