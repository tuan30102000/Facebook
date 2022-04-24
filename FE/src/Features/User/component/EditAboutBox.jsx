import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import userAuth from '../../../Api/userAuthApi';
import InputField from '../../../Components/InputField';

EditAboutBox.propTypes = {

};

function EditAboutBox({ aboutInit }) {
    const form = useForm({
        defaultValues: {
            about: aboutInit
        }
    })

    const { register, handleSubmit } = form
    const onSubmit = async (data) => {
        try {
            const result = await userAuth.editInfor(data)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <InputField register={register} placeholder={aboutInit} isTextarea={true} name={'about'} />
            <button>gui</button>
        </form>
    )
}


export default EditAboutBox;