import React from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';

import classes from './Header.module.scss';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Bell, ExclamationCircle, Grid3x3GapFill, HeartFill, StarFill, UiChecksGrid } from 'react-bootstrap-icons';
import Spinner from '../common/Spinner/Spinner';

const Header = (props) => {
    const { isLoggedIn, account } = useStoreState((state) => state.userStore);
    const { logout } = useStoreActions((actions) => actions.userStore);
    const { setPortal, setType } = useStoreActions((actions) => actions.portalStore);

    const navigate = useNavigate();

    const onLogoutClick = () => {
        logout()
        navigate('/sign');
    }

    const servicesHandler = () => {
        setPortal(null)
        setType(null)
    }

    const typesHandler = () => {
        setType(null)
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
                                    <Link className="nav-link" to="/favorites">Favorites</Link>
                                </div>
                                {!account?.isCustomer ?
                                    <>
                                        <div className={classes.Nav}>
                                            <Grid3x3GapFill />
                                            <p onClick={servicesHandler}>Services</p>
                                        </div>
                                        <div className={classes.Nav}>
                                            <StarFill />
                                            <Link className="nav-link" to="/">Business</Link>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className={classes.Nav}>
                                            <Grid3x3GapFill />
                                            <Link className="nav-link" to="/">Services</Link>
                                        </div>
                                        <div className={classes.Nav}>
                                            <UiChecksGrid />
                                            <p onClick={typesHandler}>Types</p>
                                        </div>
                                    </>
                                }
                                <div className={classes.Nav}>
                                    <Bell />
                                    <Link className="nav-link" to="/">{!account?.isCustomer ? 'Schedule' : 'Booked'}</Link>
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