import React from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';

import classes from './Header.module.scss';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Bell, CalendarCheck, ExclamationCircle, Grid3x3GapFill, HeartFill, StarFill, UiChecksGrid } from 'react-bootstrap-icons';
import Spinner from '../Spinner/Spinner';
import { PORTALS } from '../../../utils/portals';

const Header = (props) => {
    const { isLoggedIn, account } = useStoreState((state) => state.userStore);
    const { chosenPortal } = useStoreState((state) => state.portalStore);
    const { logout } = useStoreActions((actions) => actions.userStore);
    const { setPortal, setType } = useStoreActions((actions) => actions.portalStore);

    const navigate = useNavigate();

    const onLogoutClick = () => {
        logout()
        navigate('/sign');
    }

    const servicesHandler = () => {
        setPortal(PORTALS.CUSTOMER)
        setType(null)
    }

    const businessHandler = () => {
        setPortal(PORTALS.B_HOLDER)
        setType(null)
    }

    const navigateTo = (route) => {
        setPortal(PORTALS.CUSTOMER)
        navigate(route)
    }

    if (account === null && isLoggedIn) {
        return (<Spinner />)
    }

    return (
        <Navbar expand={isLoggedIn ? false : true} collapseOnSelect className={classes.Header} variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">Scheduler</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header className={classes.CloseTitle} closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={classes.Body}>
                        <div className={classes.Account}>
                            <h1>{account?.email}</h1>
                            <h3>{!account?.isCustomer ? 'Business holder' : 'Customer'}</h3>
                        </div>
                        <hr />
                        <div className={classes.BodyNav}>
                            <Nav>
                                <div className={classes.Nav}>
                                    <HeartFill name="vivid" />
                                    <p onClick={() => navigateTo('/favorites')}>Favorites</p>
                                </div>
                                <div className={classes.Nav}>
                                    <Bell />
                                    <p onClick={() => navigateTo('/booked')} >Booked</p>
                                </div>
                                {!account?.isCustomer ?
                                    <>
                                        <div className={classes.Nav}>
                                            <StarFill />
                                            <Link onClick={businessHandler} className="nav-link" to="/management">Business</Link>
                                        </div>
                                        {chosenPortal === PORTALS.CUSTOMER ?
                                            <div className={classes.Nav}>
                                                <CalendarCheck />
                                                <p onClick={businessHandler}>Schedule</p>
                                            </div>
                                            : <div className={classes.Nav}>
                                                <Grid3x3GapFill />
                                                <p onClick={servicesHandler}>Services</p>
                                            </div>}
                                    </>
                                    :
                                    <>
                                        <div className={classes.Nav}>
                                            <Grid3x3GapFill />
                                            <Link className="nav-link" to="/">Services</Link>
                                        </div>
                                    </>
                                }
                                <div className={classes.Nav}>
                                    <UiChecksGrid />
                                    <p onClick={servicesHandler}>Types</p>
                                </div>
                            </Nav>
                            <Nav>
                                <div className={classes.Nav}>
                                    <ExclamationCircle />
                                    <Link className={[classes.Logout, "nav-link"].join(' ')} to='/login' onClick={onLogoutClick}>Log out</Link>
                                </div>
                            </Nav>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Header;