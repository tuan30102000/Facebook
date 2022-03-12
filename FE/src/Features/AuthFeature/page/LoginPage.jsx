import React from 'react';
import LoginForm from '../component/LoginForm';
import { Link, useMatch } from 'react-router-dom'
function LoginPage(props) {
    // const match = useMatch()
    // console.log(match)
    return (
        <>
            <LoginForm />
            <Link className='mt-2 block cursor-pointer text-center text-purple-700' to='register' >
                Bạn chưa có tài khoản? Đăng kí tại đây
            </Link>
        </>
    );
}

export default LoginPage;