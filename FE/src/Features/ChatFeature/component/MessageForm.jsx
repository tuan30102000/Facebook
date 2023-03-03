import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { LoadIcon, SendIcon } from '../../../Components/IconCustom/IconCustom';
import useCallApi from '../../../hook/useCallApi';

MessageForm.propTypes = {

};

function MessageForm({ onSubmit, onFocus }) {
    const form = useForm({ defaultValues: { message: '' } })
    const { handleSubmit, register, reset } = form
    const { isLoading, callApi } = useCallApi(onSubmit)

    const onsubmitForm = async (value) => {
        try {
            await callApi([value])
            reset()
        } catch (error) {
        }
    }
    return (
        <div>
            <form className='w-full shadow px-3 flex py-3' onSubmit={handleSubmit(onsubmitForm)}>
                <div className='outline-none bg-[#F0F2F5] h-9 rounded-[16px] w-full px-2 py-[2px]'>
                    <input onFocus={onFocus} {...register('message', { required: true })}
                        type="text"
                        autoComplete="off"
                        className='outline-none w-full bg-[#F0F2F5] h-full'
                        placeholder='Aa' />
                </div>
                <button className='ml-2' disabled={isLoading} >
                    {!isLoading && <SendIcon />}
                    <LoadIcon isLoading={isLoading} />
                </button>
            </form>
        </div>
    );
}

export default MessageForm;