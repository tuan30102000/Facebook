import React from 'react';
import PropTypes from 'prop-types';
import PasswordField from '../../AuthFeature/component/PasswordField';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadIcon } from '../../../Components/IconCustom/IconCustom';
import useCallApi from '../../../hook/useCallApi'
import userAuth from '../../../Api/userAuthApi';
import createToast from "../../ToastFeature/createToast";
ChangePasswordForm.propTypes = {

};
const regexWhiteSpace = /^\S+$/

const schema = yup.object().shape({
    oldPassword: yup.string()
        .required('Vui lòng điền mat khau')
        .min(7, 'mật khẩu phải có 7 kí tự')
        .matches(regexWhiteSpace, 'không được chứa khoảng trăng')
        .trim(),
    newPassword: yup.string()
        .required('Vui lòng điền mat khau')
        .min(7, 'mật khẩu phải có 7 kí tự')
        .matches(regexWhiteSpace, 'không được chứa khoảng trăng')
        .trim(),
    passwordConfirm: yup.string()
        .required('vui long xac nhan mat khau')
        .oneOf([yup.ref('newPassword')], 'mat khau khong chinh xác')
        .min(7),
})
function ChangePasswordForm({ closeModal }) {
    const { isLoading, callApi } = useCallApi(userAuth.changePassword)
    const form = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            passwordConfirm: '',
        },
        resolver: yupResolver(schema),
    })
    const submit = async (data) => {
        try {
            await callApi([data])
            createToast('Đổi mật khẩu thành công')
        } catch (error) {
            createToast(error.message, 'error')

        } finally {
            closeModal()
        }
    }
    const { register, handleSubmit, formState, setError } = form
    const { errors } = formState
    return (
        <div className="w-full max-w-sm bg-white shadow-md rounded px-12 pt-4 pb-8 mb-4">
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(submit)} >
                <p className='capitalize text-center relative text-sm font-bold pb-3 mb-2'>Đổi mật khẩu</p>
                <PasswordField
                    errors={errors}
                    register={register}
                    name='oldPassword'
                    placeholder='Nhập mật khẩu cũ'
                />
                <PasswordField
                    errors={errors}
                    register={register}
                    name='newPassword'
                    placeholder='Mật khảu mới'
                />
                <PasswordField
                    errors={errors}
                    register={register}
                    name='passwordConfirm'
                    placeholder='Xác nhận mật khẩu'
                />
                <button
                    disabled={isLoading}
                    className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline'>
                    {isLoading ? <LoadIcon isLoading={isLoading} /> : <>Đổi Mật khẩu</>}
                </button>
            </form>
        </div>
    );
}

export default ChangePasswordForm;