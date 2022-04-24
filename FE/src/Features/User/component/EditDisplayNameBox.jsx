import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputField from '../../../Components/InputField';
import userAuth from '../../../Api/userAuthApi';

EditDisplayNameBox.propTypes = {
    displayNameInit: PropTypes.string.isRequired,
};
function EditDisplayNameBox({ displayNameInit }) {
    const form = useForm({
        defaultValues: {
            displayName: displayNameInit
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
            <InputField register={register} placeholder={displayNameInit} name={'displayName'} />
        </form>
    )
}

export default EditDisplayNameBox;