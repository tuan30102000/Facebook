import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { BsCardImage } from 'react-icons/bs'
import UserCurrentInfoMini from '../../../Components/UserCurrentInfoMini';
import { FaTimesCircle } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { GrClose } from 'react-icons/gr'
import RadioPrivates from './RadioPrivates';
PostForm.propTypes = {
    imgPreview: PropTypes.array.isRequired,
    textValue: PropTypes.string.isRequired,
    onUpload: PropTypes.func.isRequired,
    title: PropTypes.string,
    btnText: PropTypes.string.isRequired,
    onFileChange: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    isDisableBtn: PropTypes.bool,
    deleteFile: PropTypes.func.isRequired,
};

function PostForm({ imgPreview, textValue, onUpload, closeModal, handlePrivateChange, privateType, isLoading = false, title = '', btnText = 'UP', onFileChange, onTextChange, isDisableBtn, deleteFile }) {
    const fileRef = useRef({})
    const textRef = useRef({})
    useEffect(() => {
        textRef.current.focus()
        return () => {
        }
    }, [])

    return (
        <div className='max-h-350 w-[550px] shadow-sm'>
            <div className="bg-white border-solid border-b border-[#f3f3f4] relative justify-center items-center">
                <p className='flex text-[20px] items-center justify-center font-bold text-[#050505]  h-14' >{title}</p>
                <div onClick={closeModal} className="absolute right-2 top-[50%] translate-y-[-50%] flex justify-center items-center w-[36px] h-[36px] rounded-crical bg-[#e4e6eb] cursor-pointer">
                    <GrClose />
                </div>
            </div>
            <div className='w-full h-full bg-white pl-4 pr-3 pt-5 py-4'>
                <UserCurrentInfoMini />
                <RadioPrivates {...{ privateType, handlePrivateChange }} />
                <div className="mt-5">
                    <input disabled={isLoading} ref={fileRef} className='w-0 overflow-hidden' onChange={onFileChange} multiple accept='image/*' type="file" />
                    <textarea disabled={isLoading} value={textValue} onChange={onTextChange} className='w-full resize-none min-h-200 outline-none text-2xl' placeholder='Enter your content' ref={textRef} type="text" />
                </div>
                <div className="flex  flex-wrap gap-3 mt-8">
                    {imgPreview.map((item, i) => (
                        <div key={i} className="h-28 flex-1 relative">
                            <img className='w-full h-full object-cover' src={item} key={i} />
                            <div className="absolute top-[-8px] right-[-8px] cursor-pointer" onClick={() => deleteFile(i, item)}><FaTimesCircle /></div>
                        </div>))}
                </div>
                {imgPreview.length > 3 && <p className='text-red-600 mt-2 text-center' >3 files limit</p>}
                <div onClick={() => fileRef.current.click()} className="flex justify-center py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                    <BsCardImage className='h-[24px]' />
                </div>
                <button disabled={isDisableBtn} className='mt-5 disabled:opacity-75 w-full bg-blue-500 py-2 text-white font-[500] rounded' onClick={onUpload}>
                    {!isLoading && btnText}
                    {isLoading && <AiOutlineLoading3Quarters className='mx-auto animate-spin' />}
                </button>
            </div>
        </div>
    );
}
// !((file[0] || textValue) && (file.length <= 3))
export default PostForm