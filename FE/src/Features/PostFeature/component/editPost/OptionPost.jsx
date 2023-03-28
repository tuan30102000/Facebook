import React, { useEffect, useRef } from 'react';
import { useMemo } from 'react';
import postApi from '../../../../Api/postApi';
import CofirmBox from '../../../../Components/CofirmBox';
import Modal from '../../../../Components/Modal';
import OptionBtn from '../../../../Components/OptionBtn';
import useCallApi from '../../../../hook/useCallApi';
import EditPostForm from './EditPostForm';
OptionPost.propTypes = {

};


function OptionPost({ onClose, isShowOption, isOwnerPost, user, updateFieldPost, _id, sendNotify = [], userId, imgUrl, content, deletePost, updatePost, privateType }) {
    const openDeleteModalRef = useRef({})
    const openEditModalRef = useRef({})
    const { isLoading, callApi } = useCallApi(postApi.deletePost)
    const apiNotify = useCallApi(postApi.handleNotify)
    const hasNotify = sendNotify.includes(userId)
    const deleteItem = async () => {
        try {
            await callApi([_id])
            openDeleteModalRef.current.closeModal()
            deletePost(_id)
        } catch (error) {
            console.log(error)
        }
    }
    const notifyText = hasNotify ? 'Tắt thông báo' : 'Bật thông báo'
    const handleNotify = async (e) => {
        e.stopPropagation()
        try {
            await apiNotify.callApi([hasNotify, _id])
            updateFieldPost(_id, user._id, 'sendNotify', !hasNotify)
        } catch (error) {
            console.log(error)
        } finally {
            onClose()
        }
    }
    const ownerDataBtn = [
        { onClick: openEditModalRef.current.openModal, text: 'Chỉnh sửa bài viết' },
        { onClick: openDeleteModalRef.current.openModal, text: 'Xóa bài viết' },
    ]
    const data = [
        { onClick: handleNotify, text: notifyText },
        // { onClick: openDeleteModalRef.current.openModal, text: 'Lưu bài viết' }
    ]
    const dataBtn = useMemo(() => {
        if (isOwnerPost) return [...ownerDataBtn, ...data]
        return data

    }, [data, , isOwnerPost, ownerDataBtn])
    return (
        <>
            <OptionBtn btnData={dataBtn} isShowOption={isShowOption} onClose={onClose} />
            <Modal ref={openDeleteModalRef} Component={CofirmBox} componentProps={{
                highlightMessage: 'Are you sure?',
                message: 'Do you really want to delete these records? This process cannot be undone.',
                confirmText: 'Delete',
                onConfirm: deleteItem,
                deletePost, isLoading: isLoading,
            }} />
            <Modal Component={EditPostForm} ref={openEditModalRef} isHaveCloseBtn={false} componentProps={{
                imgPreviewInit: imgUrl, textValueInit: content, _id, privateType, updatePost, closeModal: openEditModalRef.current.closeModal
            }} />
        </>
    );
}

export default OptionPost;