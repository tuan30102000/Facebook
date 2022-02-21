import React from 'react';
import { useRoutes } from 'react-router-dom';
import FormLogin from './component/FormLogin';

AuthFeature.propTypes = {

};

function AuthFeature(props) {

    return (
        <div>
            <FormLogin />
        </div>
    );
}

export default AuthFeature;