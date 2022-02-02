import React from 'react';
import { Carousel } from 'react-bootstrap';
import Service from '../Service/Service';
import classes from './CustomerSlide.module.scss';

const CustomerSlide = (props) => {
    return (
        <div className={classes.Container}>
            <Carousel className={classes.Slider} interval={null} variant='dark'>
                <Carousel.Item className={classes.Item}>
                    {/* <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=First slide&bg=373940"
                        alt="First slide"
                    /> */}
                    {/* <Carousel.Caption> */}
                    <Service />
                    <Service />
                    <Service />
                    {/* </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Second slide&bg=282c34"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default CustomerSlide;