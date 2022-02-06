import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import classes from './Header.module.scss';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

const Header = (props) => {
    const { isLoggedIn } = useStoreState((state) => state.userStore);
    const { logout } = useStoreActions((actions) => actions.userStore);

    const navigate = useNavigate();

    const onLogoutClick = () => {
        logout()
        navigate('/sign');
    }

    return (
        <Navbar collapseOnSelect expand="md" className={classes.Header} variant="dark">
            <Navbar.Brand href="/">Scheduler</Navbar.Brand>
            {isLoggedIn ?
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