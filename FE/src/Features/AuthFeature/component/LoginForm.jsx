import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { LoadIcon } from '../../../Components/IconCustom/IconCustom';
import { login } from '../userSlice';
import PasswordField from './PasswordField';
import TextField from './TextField';
LoginForm.propTypes = {

};

const regexUsername = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
const regexWhiteSpace = /^\S+$/
const schema = yup.object().shape({
    username: yup.string()
        .required('Vui long dien ten dang nhap')
        .matches(regexUsername, 'Không sử dụng kí tự đặc biệt'),
    password: yup.string()
        .required('Vui lòng điền mat khau')
        .min(7, 'mật khẩu phải có 7 kí tự')
        .matches(regexWhiteSpace, 'không được chứa khoảng trăng'),
})

function LoginForm() {
    const dispath = useDispatch()
    const isLoginPending = useSelector(state => state.user.loginPending)
    ///form handle
    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })
    const { register, handleSubmit, formState, setError } = form
    const { errors, } = formState
    const onSubmit = (data) => {
        //Validate birthDay
        //handleSubmit\

        if (isLoginPending) return
        try {
            //handle data

            //dispath store
            const action = login(data)
            const resultAction = dispath(action)
            // setisLoading(false)
            //
        } catch (error) {
            console.log('form', error)
        }
    }

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative"
        // className='bg-white shadow-md rounded px-12 pt-4 pb-8 mb-4'
        >
            {/* {isLoading && <div className="bg-black absolute top-0 left-0 bottom-0 right-0"></div>} */}
            <p className='capitalize text-center relative text-sm font-bold pb-3 mb-2'>Đăng nhập</p>
            <TextField errors={errors} register={register} name="username" placeholder='Username' />
            <PasswordField errors={errors} register={register} name='password' placeholder='Password' />
            {/*sex  */}
            <button disabled={isLoginPending} className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none disabled:opacity-70 focus:shadow-outline'>
                {isLoginPending ? <LoadIcon isLoading={isLoginPending} /> : <>Đăng nhập</>}
            </button>
        </form>


    );
}

export default LoginForm;