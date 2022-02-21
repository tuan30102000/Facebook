import React from 'react';
import { useForm } from 'react-hook-form';
import userApi from '../../../Api/userApi';
import InputField from '../../../Components/InputField';

FormLogin.propTypes = {

};

function FormLogin({ }) {
    const loginForm = useForm({
        defaultValues: {
            username: 'tuanpham',
            password: 'ngoclinh',
        }
    })
    const onSubmitLogin = async (data) => {
        const res = await userApi.login(data)
        console.log(res)
    }
    const onRefresh = async () => {
        const res = await userApi.refresh()
        console.log(res)
    }
    const { register, handleSubmit } = loginForm
    return (
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit(onSubmitLogin)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <InputField register={register} name="username" placeholder='Username' />
                <InputField register={register} name='password' placeholder='Password' type='password' />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline'>SEND</button>
            </form>
            <button onClick={onRefresh}>
                refresh
            </button>
        </div>
    );
}

export default FormLogin;