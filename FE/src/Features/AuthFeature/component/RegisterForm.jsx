import { yupResolver } from '@hookform/resolvers/yup';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import method from '../../../Constan/method';
import { registerThunk } from '../userSlice';
import PasswordField from './PasswordField';
import RadioField from './RadioField';
import SelectField from './SelectField';
import TextField from './TextField';
RegisterForm.propTypes = {

};
const regexUsername = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
const regexWhiteSpace = /^\S+$/
const dateNow = new Date()
const schema = yup.object().shape({
    username: yup.string()
        .required('Vui long dien ten dang nhap')
        .matches(regexUsername, 'Không sử dụng kí tự đặc biệt'),
    email: yup.string()
        .required('Vui long điên email')
        .email('Trường này phải là email'),
    password: yup.string()
        .required('Vui lòng điền mat khau')
        .min(7, 'mật khẩu phải có 7 kí tự')
        .matches(regexWhiteSpace, 'không được chứa khoảng trăng'),
    passwordConfirm: yup.string()
        .required('vui long xac nhan mat khau')
        .oneOf([yup.ref('password')], 'mat khau khong chinh xác')
        .min(7),
    sex: yup.string()
        .oneOf(['male', 'female'], 'giới tinh chỉ co gia tri nam va nu')
        .required('vui long chọn giới tính của bạn'),
    day: yup.number('trường này phải là số')
        .max(31, 'chỉ có 31 ngày trong 1 tháng')
        .min(1, 'bat dau bang 1 ')
        .required('vui long chon ngay sinh'),
    month: yup.number('trường này phải là số')
        .max(12, '1 năm chỉ có 12 tháng')
        .min(1, 'chỉ bắt đầu từ 1')
        .required('vui lòng chọn tháng sinh'),
    year: yup.number()
        .max(dateNow.getFullYear(), 'bạn có nhầm lẫn gì không ')
        .required('vui lòng chọn năm sinh')
})

function RegisterForm() {
    const dispath = useDispatch()

    ///form handle
    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            sex: '',
            day: dateNow.getDate(),
            month: dateNow.getMonth(),
            year: dateNow.getFullYear(),


        },
        resolver: yupResolver(schema),
    })
    const { register, handleSubmit, formState, setError } = form
    const { errors } = formState
    //data date
    const monthArr = method.renderList(12, i => i + 1)
    const daytArr = method.renderList(31, i => i + 1)
    const yearArr = method.renderList(100, i => dateNow.getFullYear() - i)

    const onSubmit = async (data) => {
        const nowDate = new Date()
        const birthDay = new Date(data.year, data.month - 1, data.day + 1)
        if (nowDate < birthDay) {
            setError('year', { type: 'valid date', message: 'Ngày tháng năm sinh không hợp lệ' }, { shouldFocus: true })
            return
        }
        //handleSubmit
        try {
            //handle data
            const newData = { ...data, birthDay }
            delete newData.day
            delete newData.month
            delete newData.year
            delete newData.passwordConfirm
            //dispath store
            const action = await registerThunk(newData)
            const resultAction = dispath(action)
            const userData = unwrapResult(resultAction)
            //
            console.log(userData)
        } catch (error) {
            console.log('form', error)
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} className=''>
            <p className='capitalize text-center relative text-sm font-bold pb-3 mb-2'>Tạo tài khoản mới </p>
            <TextField
                errors={errors}
                register={register}
                name="username"
                placeholder='Username'
            />
            <TextField
                errors={errors}
                register={register}
                name="email"
                placeholder='Email'
            />
            <PasswordField
                errors={errors}
                register={register}
                name='password'
                placeholder='Password'
            />
            <PasswordField
                errors={errors}
                register={register}
                name='passwordConfirm'
                placeholder='Confirm Password'
            />
            {/*sex  */}
            <div className="mt-3">
                <p className='capitalize font-bold mb-1'>Giới tính</p>
                <div className="flex gap-2">
                    <RadioField
                        name='sex'
                        value={'male'}
                        labelText='Nam'
                        register={register}

                    />
                    <RadioField
                        name='sex'
                        value={'female'}
                        labelText='Nữ'
                        register={register}

                    />
                </div>
                {!!errors.sex && <p className='text-red-600'>{errors.sex?.message}</p>}
            </div>
            {/*birth  day*/}
            <div className="mt-3">
                <p className="capitalize font-bold">Sinh nhật</p>
                <div className="flex gap-3">
                    <SelectField
                        listValue={daytArr}
                        name={'day'}
                        register={register}
                    />
                    <SelectField
                        listValue={monthArr}
                        name={'month'}
                        register={register}
                    />
                    <SelectField
                        listValue={yearArr}
                        name={'year'}
                        register={register}
                    />
                </div>
                {!!errors.day && <p className='text-red-600'>{errors.day?.message}</p>}
                {!!errors.month && <p className='text-red-600'>{errors.month?.message}</p>}
                {!!errors.year && <p className='text-red-600'>{errors.year?.message}</p>}

            </div>
            <button
                className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline'>
                SEND
            </button>
        </form>

    );
}

export default RegisterForm;