import React, { useEffect, useRef } from 'react';
import postApi from '../../../../Api/postApi';
import CofirmBox from '../../../../Components/CofirmBox';
import Modal from '../../../../Components/Modal';
import EditPostForm from './EditPostForm';
OptionPost.propTypes = {

};
function ButtonOption({ text = '', onClick = () => undefined }) {
    return (
        <button onClick={onClick} className="py-1 px-2 w-full text-left hover:bg-[#0000000d]">{text}</button>
    )
}

{/* <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" color="#7a1b3b" className="w-7 h-7 text-red-500 first:stroke-current" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(122, 27, 59)' }}><path fill="none" stroke="#red" strokeWidth={2} d="M3,3 L21,21 M3,21 L21,3" /></svg> */ }
function OptionBtn({ onClose, openDeleteModal, openEditModal, }) {
    const openDelete = (e) => {
        if (openDeleteModal) {
            openDeleteModal()
            return
        }
        console.log('Delete')
    }
    const openEdit = (e) => {
        if (openEditModal) {
            openEditModal()
            return
        }
        console.log('edit')
    }
    useEffect(() => {
        // 
        const windowClick = () => onClose && onClose()
        window.addEventListener('click', windowClick)
        return () => {
            // 
            window.removeEventListener('click', windowClick)
        }
    }, []);
    return (
        <div className='bg-white rounded-[4px] w-[200px] shadow py-2' >
            <ButtonOption onClick={openDelete} text='Xóa bài viết' />
            <ButtonOption onClick={openEdit} text='Chỉnh sửa bài viết' />
        </div>
    );
}

function OptionPost({ onClose, isShowOption, postId, urlList, content, deletePost, updatePost }) {
    const openDeleteModalRef = useRef({})
    const openEditModalRef = useRef({})
    const deleteItem = async () => {
        try {
            const data = await postApi.deletePost(postId)
            openDeleteModalRef.current.closeModal()
            deletePost(postId)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {isShowOption && <OptionBtn onClose={onClose} openEditModal={openEditModalRef.current.openModal} openDeleteModal={openDeleteModalRef.current.openModal} />}
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