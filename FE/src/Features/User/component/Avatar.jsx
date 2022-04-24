import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { BiCamera } from 'react-icons/bi';
import Modal from '../../../Components/Modal';
import EditAvatarBox from './EditAvatarBox';

Avatar.propTypes = {
    avatarUrl: PropTypes.string.isRequired,
};

function Avatar({ isOwner = false, avatarUrl }) {
    const handleModal = useRef({})


    return (
        <div className="rounded-crical left-0 w-[168px] h-[168px] absolute top-[-34px] border-4 border-[#1c1e21] cursor-pointers">
            <img src={avatarUrl} className='rounded-crical w-full h-full object-cover' alt="" />
            {isOwner &&
                <>
                    <BiCamera onClick={() => {
                        handleModal.current.openModal()
                    }} className='absolute bottom-0 right-0' />
                    <Modal Component={EditAvatarBox} componentProps={{ avatarUrl }} ref={handleModal} />
                </>
            }
        </div>
    )
}

export default Avatar;