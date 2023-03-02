import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { BiSend } from "react-icons/bi"
import { SendIcon } from '../../../Components/IconCustom/IconCustom';

MessageForm.propTypes = {

};

function MessageForm({ onSubmit, onFocus }) {
    const form = useForm({ defaultValues: { message: '' } })
    const { handleSubmit, register, reset } = form
    const onsubmitForm = async (value) => {
        await onSubmit(value)
        reset()
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
                <button>
                    <SendIcon />
                </button>
            </form>
        </div>
    );
}

export default MessageForm;