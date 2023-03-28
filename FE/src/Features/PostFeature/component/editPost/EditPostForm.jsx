import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostForm from '../PostForm';
import postApi from '../../../../Api/postApi';
import userApi from '../../../../Api/userApi';
import useCallApi from '../../../../hook/useCallApi';
EditPostForm.propTypes = {

};

function EditPostForm({ imgPreviewInit = [], privateType, textValueInit, updatePost, _id, closeModal }) {
    const { isLoading, callApi } = useCallApi(postApi.updatePost)
    const [file, setfile] = useState([])
    const [currentListImg, setcurrentListImg] = useState([...imgPreviewInit])
    const [listBlob, setlistBlob] = useState([])
    const [privateState, setprivateState] = useState(privateType)
    const [textValue, settextValue] = useState(textValueInit)
    const isReadyToSend = !((file[0] || currentListImg[0] || textValue) && (file.length + currentListImg.length <= 3))
    const isDisableBtn = isLoading || isReadyToSend
    const onUpload = async () => {
        if (file.length + currentListImg > 3) return
        if (isDisableBtn) return
        const data = {
            content: textValue, imgFile: file, photos: currentListImg, privateType: privateState
        }
        try {
            const result = await callApi([_id, data])
            closeModal()
            updatePost(result)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePrivateChange = (event) => {
        setprivateState(event.target.value);
    }
    const onTextChange = (e) => {
        const value = e.target.value
        settextValue(value)
    }
    const onFileChange = (e) => {
        const fileList = Array.from(e.target.files)
        const newFileList = [...file, ...fileList,]
        setfile(newFileList)

    }
    useEffect(() => {
        const listUrl = file.map(item => URL.createObjectURL(item))
        setlistBlob(listUrl)
        return () => {
            listUrl.map(item => URL.revokeObjectURL(item))
        }
    }, [file]);
    const deleteFile = (i, url) => {
        const isBlob = url.split(':')[0] === 'blob'
        if (isBlob) {
            const index = i - currentListImg.length
            const fileClone = [...file]
            const newFileList = [...fileClone.slice(0, index), ...fileClone.slice(index + 1)]
            setfile(newFileList)
        }
        else {
            const cloneCurrenImg = [...currentListImg]
            const filterBlob = cloneCurrenImg.filter(item => item != url)
            setcurrentListImg(filterBlob)
        }

    }
    return (
        <>
            <PostForm
                onUpload={onUpload}
                imgPreview={[...currentListImg, ...listBlob]}
                onTextChange={onTextChange}
                onFileChange={onFileChange}
                deleteFile={deleteFile}
                title='Sửa bài viết'
                btnText='Sửa'
                isDisableBtn={isDisableBtn}
                textValue={textValue}
                closeModal={closeModal}
                isLoading={isLoading}
                handlePrivateChange={handlePrivateChange}
                privateType={privateState}
            />
        </>
    );
}

export default EditPostForm;