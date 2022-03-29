import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import HomePage from './page/HomePage';


ControlPage.propTypes = {

};

function ControlPage() {
    const user = useSelector(state => state.user)
    return (
        <>
            {
                !user.login && <Navigate to='/auth/login' />
            }
            {
                user.login && <HomePage />
            }
        </>
    );
}

export default ControlPage;