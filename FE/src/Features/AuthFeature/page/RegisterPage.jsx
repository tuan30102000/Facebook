import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RegisterForm from '../component/RegisterForm';
function RegisterPage(props) {
    const user = useSelector(state => state.user)

    return (
        <>
            <RegisterForm />
            <Link className='mt-2 block cursor-pointer text-center text-purple-700' to='/auth/login' >
                Bạn đã có tài khoản? Đăng nhập tại đây
            </Link>
        </>
    );
}

export default RegisterPage;