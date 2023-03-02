import React from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { BiCamera } from 'react-icons/bi';
import EditAvatarBox from './EditAvatarBox';
import Modal from '../../../Components/Modal';
import userAuth from '../../../Api/userAuthApi';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../AuthFeature/userSlice';

CoverAvatar.propTypes = {

};

function CoverAvatar({ coverAvatar, isOwner = false }) {
    const handleModal = useRef({})
    const dispatch = useDispatch()
    const onHandleSubmit = async (file) => {
        try {
            const data = await userAuth.editCoverAvatar(file)
            console.log(data)
            dispatch(updateUserInfo({ key: 'coverAvatar', data: data.coverAvatar }))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="rounded-cover rounded-t-[0px] h-[400px] overflow-hidden relative">
            <img src={coverAvatar} alt="" className='w-full h-full' />
            {isOwner &&
                <>
                    <BiCamera onClick={() => {
                        handleModal.current.openModal()
                    }} className='absolute cursor-pointer bottom-0 right-0' />
                    <Modal Component={EditAvatarBox} componentProps={{ url: coverAvatar, submit: onHandleSubmit }} ref={handleModal} />
                </>
            }
        </div>
    );
}

export default CoverAvatar;