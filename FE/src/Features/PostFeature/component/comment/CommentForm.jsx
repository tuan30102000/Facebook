import React from 'react'
import { useForm } from 'react-hook-form'
import { BiSend } from "react-icons/bi"
function CommentForm({ submit = () => { },defaultValues='' }) {
    const form = useForm({
        defaultValues: {
            comment: defaultValues
        }
    })

    const { register, handleSubmit, formState, reset } = form
    const { isSubmitting, errors, } = formState
    const resetCm = () => reset({ comment: '' })
    function onSubmit(value) {
        submit(value, resetCm)
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
            <button>
                <BiSend className='' />
            </button>
        </form>
    )
}

CommentForm.propTypes = {}

export default CommentForm
