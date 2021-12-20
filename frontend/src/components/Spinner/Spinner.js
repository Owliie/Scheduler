import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = (props) => {

    let spinner = (<div className={[classes.Container, props.className].join(' ')}>
        <div className={classes.Loader}>Loading...</div>
    </div>);

    return (spinner);
}

export default Spinner;