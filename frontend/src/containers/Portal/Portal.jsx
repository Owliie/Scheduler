import { useStoreActions } from 'easy-peasy';
import React from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import Service from '../../components/Service/Service';
import { PORTALS } from '../../utils/portals';
import classes from './Portal.module.scss';

const Portal = (props) => {
    const { setPortal } = useStoreActions((actions) => actions.portalStore);

    const bHolderHandler = () => {
        setPortal(PORTALS.B_HOLDER)
    }

    const customerHandler = () => {
        setPortal(PORTALS.CUSTOMER)
    }

    return (
        <div className={classes.Container}>
            <Service
                heading='Business Portal'
                caption='This is the place where your business blooms!'
                theme={classes.ServiceTheme}
                icon={<PersonCircle />}
                image={'/assets/businessPortal.jpg'}
                button={<button onClick={bHolderHandler}>Proceed</button>} />

            <Service
                heading='Customer Portal'
                caption='Book your service now!'
                theme={classes.ServiceTheme}
                icon={<PersonCircle />}
                image={'/assets/customerPortal.jpg'}
                button={<button onClick={customerHandler}>Proceed</button>} />
        </div>
    )
}

export default Portal;