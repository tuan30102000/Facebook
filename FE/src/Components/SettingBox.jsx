import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logout } from '../Features/AuthFeature/userSlice';
import { useRef } from 'react';
import Modal from './Modal'
import ChangePasswordForm from '../Features/User/component/ChangePasswordForm'
SettingBox.propTypes = {

};

function SettingBox({ }) {
    const dispatch = useDispatch()
    const changePasswordFormRef = useRef({})
    const onLogoutClick = () => {
        const action = logout()
        const resultAction = dispatch(action)
    }
    const onChangPasswordClick = (e) => {
        e.stopPropagation()
        changePasswordFormRef.current.openModal()
    }
    return (
        <div className="py-5">
            <button className='block' onClick={onLogoutClick}>
                Log out
            </button>
            <button className='block' onClick={onChangPasswordClick}>
                Đổi mật khẩu
            </button>
            <Modal ref={changePasswordFormRef} Component={ChangePasswordForm} />
        </div>
    );
}

export default SettingBox;