import React, { useEffect, useRef, useState } from 'react';
import postApi from '../../../../Api/postApi';
import { FaTimesCircle } from 'react-icons/fa'
import { BsCardImage } from 'react-icons/bs'
import UserInfoMini from '../../../../Components/UserInfoMini';
import { useSelector } from 'react-redux';
PostForm.propTypes = {

};

function PostForm({imgPreviewInit,textValueInit}) {
    const [imgPreview, setimgPreview] = useState([])
    const [file, setfile] = useState([])
    const [textValue, settextValue] = useState('')
    const fileRef = useRef()
    const textRef = useRef()
    const user = useSelector(state => state.user)
    useEffect(() => {
        const listUrl = file.map(item => URL.createObjectURL(item))
        setimgPreview(listUrl)
        return () => {
            listUrl.map(item => URL.revokeObjectURL(item))
        }
    }, [file])

    const onFileChange = (e) => {
        const fileList = Array.from(e.target.files)
        const newFileList = [...file, ...fileList,]
        setfile(newFileList)

    }
    const onTextChange = (e) => {
        const value = e.target.value
        settextValue(value)
    }
    const deleteFile = (index) => {
        const fileClone = [...file]
        const newFileList = [...fileClone.slice(0, index), ...fileClone.slice(index + 1)]
        setfile(newFileList)
    }
    const sendPost = async () => {
        if (file.length > 3) return
        try {
            const data = await postApi.createPost({ photo: file, content: textValue })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='max-h-350 w-500'>
            <p className='flex items-center justify-center font-bold bg-white border-solid border-b border-gray-400 h-14' >Tao bai viet</p>
            <div className='w-full h-full bg-white pl-4 pr-3 pt-5'>
                <UserInfoMini avartUrl={user.current.data.avatarUrl} displayName={user.current.data.displayName} />
                <div className="mt-5">
                    <input ref={fileRef} className='w-0 overflow-hidden' onChange={onFileChange} multiple accept='image/*' type="file" />
                    <textarea onChange={onTextChange} className='w-full resize-none min-h-200 outline-none text-2xl' placeholder='Enter your content' ref={textRef} type="text" />
                </div>
                <div className="flex  flex-wrap gap-3 mt-8">
                    {imgPreview.map((item, i) => (
                        <div key={i} className="h-28 flex-1 relative">
                            <img className='w-full h-full object-cover' src={item} key={i} />
                            <div className="absolute top-[-8px] right-[-8px] cursor-pointer" onClick={() => deleteFile(i)}><FaTimesCircle /></div>
                        </div>))}
                </div>
                {file.length > 3 && <p className='text-red-600 mt-2 text-center' >3 files limit</p>}
                <div onClick={() => fileRef.current.click()} className="flex justify-center py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                    <BsCardImage className='h-[24px]' />
                </div>
                <button disabled={!((file[0] || textValue) && (file.length <= 3))} className='mt-5 disabled:opacity-75 w-full bg-blue-500 py-2 text-white font-[500] rounded' onClick={sendPost}>
                    Đăng
                </button>
            </div>
        </div>
    );
}
