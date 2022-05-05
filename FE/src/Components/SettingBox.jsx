import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logout } from '../Features/AuthFeature/userSlice';

SettingBox.propTypes = {

};

function SettingBox(props) {
    const dispatch = useDispatch()
    const onClick = () => {
        const action = logout()
        dispatch(action)
    }
    return (
        <div onClick={onClick} >
            Log out
        </div>
    );
}

export default SettingBox;