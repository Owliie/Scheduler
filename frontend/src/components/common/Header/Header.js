import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import classes from './Header.module.scss';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Header = (props) => {
    const history = useNavigate();

    const onLogoutClick = () => {
        history.push('/login');
    }

    return (
        <Navbar collapseOnSelect expand="md" className={classes.Header} variant="dark">
            <Navbar.Brand href="/">Scheduler</Navbar.Brand>
            {false ? // after login
                <>
                    <Nav>
                        <Link className="nav-link" to="/">Dashboard</Link>
                        <Link className="nav-link" to="/history">Favorites</Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Link className="nav-link" to='/login' onClick={onLogoutClick}>Logout</Link>
                    </Nav>
                </>
                : null}
        </Navbar >
    )
}

export default Header;