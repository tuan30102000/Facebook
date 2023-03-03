import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../../Components/Loading';

AuthFeature.propTypes = {

};

function AuthFeature(props) {
    const user = useSelector(state => state.user)

    return (
        <>
            {!user.login &&
                <div className="flex w-full justify-center items-center h-screen bg-bg-all">
                    <div className='w-full max-w-sm bg-white shadow-md rounded px-12 pt-4 pb-8 mb-4'>
                        {user.loginPending && <Loading isLoading={user.loginPending}/>}
                        <Outlet />
                    </div>
                </div>
            }
            {
                user.login && <Navigate to='/' />
            }
        </>
    );
}

export default AuthFeature;