import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

ControlPage.propTypes = {

};

function ControlPage({ Component }) {
    const user = useSelector(state => state.user)
    return (
        <>
            {
                !user.login && <Navigate to='/auth/login' />
            }
            {
                user.login && <Component Outlet={Outlet} />
            }
        </>
    );
}

export default ControlPage;