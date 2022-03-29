import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../Components/Modal';
import UserInfoMini from '../../../../Components/UserInfoMini';
import { useSelector } from 'react-redux';

import CreatePostForm from './CreatePostForm';

CreatePostLayout.propTypes = {

};
function CreatePostLayout({ addToStartPost }) {
    const openModalRef = useRef({})
    const user = useSelector(state => state.user)
    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <>
            <div className='w-full'>
                <div className="flex bg-white shadow items-center mx-auto w-[500px] px-4 py-3 gap-3 rounded-[8px]">
                    <UserInfoMini avartUrl={user.current.data.avatarUrl} avtSize='w-[40px] h-[40px]' />
                    <div className="flex-1 flex justify-center bg-[#F0F2F5] ga cursor-pointer py-2 text-[15px] font-bold rounded-[20px] hover:bg-[#E4E6EB]" onClick={openModalRef.current.openModal}>
                        + Thêm bài viết
                    </div>
                </div>
            </div>
            <Modal ref={openModalRef} Component={CreatePostForm} componentProps={{ addToStartPost }} />
        </>
    );
}

export default CreatePostLayout;