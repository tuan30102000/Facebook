import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logout } from '../Features/AuthFeature/userSlice';

SettingBox.propTypes = {

};

function SettingBox(props) {
    const dispatch = useDispatch()
    const onClick = async () => {
        const action = await logout()
        const resultAction = dispatch(action)
    }
    return (
        <div onClick={onClick}>
            Log out
        </div>
    );
}

export default SettingBox;