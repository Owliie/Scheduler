import React, { useEffect, useRef, useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import { CloudPlus, PencilFill, TrashFill } from 'react-bootstrap-icons';
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
    const [availableDays, setAvailableDays] = useState([]);

    const selectRef = useRef(null);

    useEffect(() => {
        loadProducts()
        loadTypes()
        loadWeekData()
    }, []);

    const loadProducts = async () => {
        const res = await ProductService.getAll()
        setProducts(res)
    }

    const loadTypes = async () => {
        const res = await BusinessService.getTypes()
        setBusinessTypes(res)
    }

    const loadWeekData = async () => {
        const res = await UserService.getProfile()
        const tempDays = []
        for (const day of res.company.availability) {
            if (day.startHour !== day.endHour) {
                tempDays.push(day.day)
            }
        }
        setAvailableDays(tempDays)
        setWeekData(res.company.availability)
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

    const changeDayHandler = async (e, value, day) => {
        const newValue = e.target.value
        const updatedWeekData = [...weekData]
        let found = updatedWeekData.find(el => el.id === day.id)
        found[value] = newValue

        setWeekData(updatedWeekData)
    }

    const updateAvailableDaysHandler = (day, checked) => {
        let tempDays = [...availableDays]
        if (checked) {
            tempDays.push(day)
        } else {
            const found = tempDays.indexOf(day)
            if (found !== -1) {
                tempDays.splice(found, 1);
            }
        }

        setAvailableDays(tempDays)
    }

    const saveWeekData = async () => {
        const tempData = [...weekData]
        for (const data of tempData) {
            if (!availableDays.includes(data.day)) {
                data.startHour = data.endHour = data.startMinute = data.endMinute = 0
            }
        }

        await UserService.setAvailability(tempData)
        await loadWeekData()
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
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Delete</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Duration in minutes</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>
                                <tr className={classes.Product} key={product.id} onDoubleClick={() => enableEditHandler(product)}>
                                    <td><TrashFill onClick={() => deleteProductHandler(product.id)} /></td>
                                    <td><input disabled={!product.edit} defaultValue={product.name}></input></td>
                                    <td><input disabled={!product.edit} defaultValue={product.price}></input></td>
                                    <td><input disabled={!product.edit} defaultValue={product.durationInMinutes}></input></td>
                                    <td>{product.edit ? <CloudPlus onClick={() => updateProductHandler(product.id, product)} /> : <PencilFill onClick={() => enableEditHandler(product)} />}</td>
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
                <Table className={classes.Availability}>
                    <thead>
                        <tr>
                            <th />
                            <th>Day</th>
                            <th>Start</th>
                            <th>End</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weekData.map((day, i) => {
                            return (<tr key={i}>
                                <th>
                                    <Form.Check type='checkbox' defaultChecked={day.startHour !== day.endHour} onChange={(e) => updateAvailableDaysHandler(day.day, e.target.checked)} />
                                </th>
                                <td>{weekDays[i]}</td>
                                <td className={classes.Time}>
                                    <input onChange={(e) => changeDayHandler(e, 'startHour', day)} defaultValue={day.startHour} placeholder='h' /> :
                                    <input onChange={(e) => changeDayHandler(e, 'startMinute', day)} defaultValue={day.startMinute} placeholder='m' />
                                </td>
                                <td className={classes.Time}>
                                    <input onChange={(e) => changeDayHandler(e, 'endHour', day)} defaultValue={day.endHour} placeholder='h' /> :
                                    <input onChange={(e) => changeDayHandler(e, 'endMinute', day)} defaultValue={day.endMinute} placeholder='m' />
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <button className={classes.SaveBtn} onClick={saveWeekData}>Save</button>
            </div>
        </div >
    )
}

export default BusinessManagement;