import React, { useEffect, useState } from 'react';
import postApi from '../../../../Api/postApi';
import PostForm from '../PostForm';
CreatePostForm.propTypes = {

};
function CreatePostForm({ closeModal, addToStartPost }) {
    const [imgPreview, setimgPreview] = useState([])
    const [file, setfile] = useState([])
    const [textValue, settextValue] = useState('')
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        const listUrl = file.map(item => URL.createObjectURL(item))
        setimgPreview(listUrl)
        return () => {
            listUrl.map(item => URL.revokeObjectURL(item))
        }
    }, [file])
    const notRedytoSend = !((file[0] || textValue) && (file.length <= 3))
    const isDisableBtn = isLoading || notRedytoSend
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
        if (isDisableBtn) return
        setisLoading(true)
        try {
            const data = await postApi.createPost({ photo: file, content: textValue })
            addToStartPost(data)
            closeModal()
            setisLoading(false)
        } catch (error) {
            console.log(error)
            setisLoading(false)
        }
    }
    return (
        <>
            <PostForm
                onUpload={sendPost}
                imgPreview={imgPreview}
                onTextChange={onTextChange}
                onFileChange={onFileChange}
                deleteFile={deleteFile}
                title='Tạo bài viết'
                btnText='Đăng'
                isDisableBtn={isDisableBtn}
                textValue={textValue}
                closeModal={closeModal}
                isLoading={isLoading}
            />
        </>
    );
}

export default CreatePostForm;