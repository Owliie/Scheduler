import React, { useEffect, useRef, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { CloudPlus, TrashFill } from 'react-bootstrap-icons';
import { toastHandler, TOAST_STATES } from '../../helpers/toast';
import BusinessService from '../../services/businessService';
import ProductService from '../../services/productService';
import UserService from '../../services/userService';
import classes from './BusinessManagement.module.scss';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const BusinessManagement = (props) => {
    const [products, setProducts] = useState([]);
    const [businessTypes, setBusinessTypes] = useState([]);
    const [expandForm, setExpandForm] = useState(false);
    const [newProduct, setNewProduct] = useState({});
    const [weekData, setWeekData] = useState([]);

    const selectRef = useRef(null);

    useEffect(() => {
        loadProducts()
        loadTypes()
    }, []);

    const loadProducts = async () => {
        const res = await ProductService.getAll()
        setProducts(res)
    }

    const loadTypes = async () => {
        const res = await BusinessService.getTypes()
        setBusinessTypes(res)
    }

    const saveTypeHandler = async () => {
        const businessTypeId = selectRef.current.value;

        await UserService.setBusinessType(businessTypeId)
    }

    const handleSaveProduct = async () => {
        if (newProduct.name && newProduct.price && newProduct.durationInMinutes) {
            await ProductService.create(newProduct)
        } else {
            toastHandler({ success: TOAST_STATES.ERROR, message: 'Invalid new product data' })
        }

        setExpandForm(false)
        setNewProduct({})

        await loadProducts()
    }

    const deleteProductHandler = async (id) => {
        await ProductService.delete(id)

        await loadProducts()
        toastHandler({ success: TOAST_STATES.SUCCESS, message: 'Product deleted successfully' })
    }

    const updateProductHandler = async (id, product) => {
        const updatedProducts = [...products]
        const found = updatedProducts.find(el => el.id === id)
        delete found.edit
        setProducts(updatedProducts)

        await ProductService.update(id, product)
        await loadProducts()
    }

    const enableEditHandler = (product) => {
        const updatedProducts = [...products]
        const found = updatedProducts.find(el => el.id === product.id)
        found.edit = true

        setProducts(updatedProducts)
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Heading}>
                <h1>Settings</h1>
                <p>Manage your business</p>
            </div>
            <hr />
            <div>
                <div className={classes.Category}>Business type</div>
                <div className={classes.SelectForm}>
                    <Form.Select ref={selectRef} aria-label="Select business type">
                        <option>Select type</option>
                        {businessTypes.map(type =>
                            <option key={type.id} value={type.id}>{type.name}</option>
                        )}
                    </Form.Select>
                    <button className={classes.SaveBtn} onClick={saveTypeHandler}>Save</button>
                </div>
            </div>
            <hr />
            <div>
                <div className={classes.Category}>Products</div>
                <div className={classes.Products}>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Delete</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Duration in minutes</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>
                                <tr className={classes.Product} key={product.id} onDoubleClick={() => enableEditHandler(product)}>
                                    <td><TrashFill onClick={() => deleteProductHandler(product.id)} /></td>
                                    <td><input disabled={!product.edit} defaultValue={product.name}></input></td>
                                    <td><input disabled={!product.edit} defaultValue={product.price}></input></td>
                                    <td><input disabled={!product.edit} defaultValue={product.durationInMinutes}></input></td>
                                    <td>{product.edit ? <CloudPlus onClick={() => updateProductHandler(product.id, product)} /> : null}</td>
                                </tr>
                            )}
                            {expandForm ?
                                <tr className={classes.Product} >
                                    <td></td>
                                    <td><input onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder='Name' /></td>
                                    <td><input onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder='Price' /></td>
                                    <td><input onChange={(e) => setNewProduct({ ...newProduct, durationInMinutes: e.target.value })} placeholder='Duration' /></td>
                                    <td><CloudPlus onClick={handleSaveProduct} /></td>
                                </tr>
                                : null}
                        </tbody>
                    </Table>
                    {expandForm ? null : <button className={[classes.ExpandFormBtn, classes.SaveBtn].join(' ')} onClick={() => setExpandForm(true)}>+</button>}
                </div>
            </div>
            <hr />
            <div>
                <div className={classes.Category}>Change availability</div>
                {/* {weekDays.map()} */}
            </div>
        </div >
    )
}

export default BusinessManagement;