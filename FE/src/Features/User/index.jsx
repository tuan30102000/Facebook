import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header/Header';

UserControl.propTypes = {

};

function UserControl({ Outlet }) {
    return (

        <>
            <Header />
            <Outlet />
        </>
    );
}

export default UserControl;