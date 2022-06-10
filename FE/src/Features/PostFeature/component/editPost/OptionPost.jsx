import React, { useEffect, useRef } from 'react';
import postApi from '../../../../Api/postApi';
import CofirmBox from '../../../../Components/CofirmBox';
import Modal from '../../../../Components/Modal';
import OptionBtn from '../../../../Components/OptionBtn';
import EditPostForm from './EditPostForm';
OptionPost.propTypes = {

};


function OptionPost({ onClose, isShowOption, postId, urlList, content, deletePost, updatePost }) {
    const openDeleteModalRef = useRef({})
    const openEditModalRef = useRef({})
    const deleteItem = async () => {
        try {
            await postApi.deletePost(postId)
            openDeleteModalRef.current.closeModal()
            deletePost(postId)
        } catch (error) {
            console.log(error)
        }
    }

    const dataBtn = [
        { onClick: openEditModalRef.current.openModal, text: 'Chỉnh sửa bài viết' },
        { onClick: openDeleteModalRef.current.openModal, text: 'Xóa bài viết' }
    ]

    return (
        <>

            <OptionBtn btnData={dataBtn} isShowOption={isShowOption} onClose={onClose} />
            <Modal ref={openDeleteModalRef} Component={CofirmBox} componentProps={{
                highlightMessage: 'Are you sure?',
                message: 'Do you really want to delete these records? This process cannot be undone.',
                confirmText: 'Delete',
                onConfirm: deleteItem,
                deletePost
            }} />
            <Modal Component={EditPostForm} ref={openEditModalRef} componentProps={{
                imgPreviewInit: urlList, textValueInit: content, postId, updatePost, closeModal: openEditModalRef.current.closeModal
            }} />
        </>
    );
}

export default OptionPost;