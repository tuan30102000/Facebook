import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { BiSend } from "react-icons/bi"
import { LoadIcon } from '../../../../Components/IconCustom/IconCustom'
import useCallApi from '../../../../hook/useCallApi'
function CommentForm({ submit, defaultValues = '' }) {
    const form = useForm({
        defaultValues: {
            comment: defaultValues
        }
    })
    const { isLoading, callApi } = useCallApi(submit)
    const { register, handleSubmit, formState, reset } = form
    const resetCm = () => reset({ comment: '' })
    async function onSubmit(value) {
        try {
            await callApi([value])
            resetCm()
        } catch (error) {
            console.log(error)
            resetCm()
        }
    }
    return (
        <form className='w-full flex' onSubmit={handleSubmit(onSubmit)} >
            <div className='outline-none bg-[#F0F2F5] h-9 rounded-[16px] w-full px-2 py-[2px]'>
                <input {...register('comment', { required: true })}
                    type="text"
                    autoComplete="off"
                    className='outline-none w-full bg-[#F0F2F5] h-full'
                    placeholder='Enter your comment here' />
            </div>
            <button disabled={isLoading} >
                {!isLoading && <BiSend className='' />}
                <LoadIcon isLoading={isLoading} />
            </button>
        </form>
    )
}

CommentForm.propTypes = {}

export default CommentForm
