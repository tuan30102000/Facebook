import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Modal from '../../../../Components/Modal';
import UserCurrentInfoMini from '../../../../Components/UserCurrentInfoMini';
import CreatePostForm from './CreatePostForm';


CreatePostLayout.propTypes = {
    addToStartPost: PropTypes.func.isRequired,
};
function CreatePostLayout({ addToStartPost }) {
    const openModalRef = useRef({})
    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <>
            <div className='w-full'>
                <div className="flex bg-white shadow items-center mx-auto w-[500px] px-4 py-3 gap-3 rounded-[8px]">
                    <UserCurrentInfoMini isShowName={false} />
                    <div className="flex-1 flex justify-center bg-[#F0F2F5] ga cursor-pointer py-2 text-[15px] font-bold rounded-[20px] hover:bg-[#E4E6EB]" onClick={openModalRef.current.openModal}>
                        + Thêm bài viết
                    </div>
                </div>
            </div>
            <Modal ref={openModalRef} isHaveCloseBtn={false} Component={CreatePostForm} componentProps={{ addToStartPost }} />
        </>
    );
}

export default CreatePostLayout;