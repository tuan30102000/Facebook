import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiCamera } from 'react-icons/bi';
import Modal from '../../../Components/Modal';
import useImgFile from '../../hook/useImgFIle';
import userAuth from '../../../Api/userAuthApi';
import { useForm } from 'react-hook-form';
import InputField from '../../../Components/InputField'
import { AiOutlineEdit } from 'react-icons/ai'
import MakeFriendList from '../../../Components/MakeFriendBox';
CurrentProfile.propTypes = {

};
function CurrentCoverAvatar({ coverAvatar }) {
    return (
        <div className="">
            <img src={coverAvatar} alt="" />
        </div>
    )
}
function CurrentAvatar({ avatarUrl }) {
    const handleModal = useRef({})

    return (
        <div className="rounded-crical w-[168px] h-[168px] relative cursor-pointers">
            <img src={avatarUrl} className='rounded-crical w-full h-full object-cover' alt="" />
            <BiCamera onClick={() => {
                handleModal.current.openModal()
            }} className='absolute bottom-0 right-0' />
            <Modal Component={EditAvatarBox} componentProps={{ avatarUrl }} ref={handleModal} />
        </div>
    )
}
function EditAvatarBox({ avatarUrl }) {
    const fileInputRef = useRef({})
    const { onChange, imgPreview, file, isChange } = useImgFile(avatarUrl)
    const onSend = async () => {
        try {
            if (!isChange) return
            const data = await userAuth.editAvatar(file)
            console.log(data)
        } catch (error) {

        }
    }
    return (
        <div className="flex">
            <div className="w-[500px] h-[500px]">
                <img className='w-full h-full' src={imgPreview} alt="" />
            </div>
            <div className="">
                <input onChange={onChange} type='file' accept='image/*' className='w-0 h-0' ref={fileInputRef} />
                <button onClick={() => fileInputRef.current.click()}>
                    openFile
                </button>
                <div className="" onClick={onSend}>Send</div>
            </div>
        </div>
    )
}
function CurrentDisplayName({ displayName }) {
    const handleModalRef = useRef()
    return (

        <div className="flex">
            <p> {displayName}</p>
            <AiOutlineEdit onClick={() => handleModalRef.current.openModal()} />
            <Modal ref={handleModalRef} Component={EditDisplayNameBox} componentProps={{
                displayNameInit: displayName
            }} /></div>

    )
}
function EditDisplayNameBox({ displayNameInit }) {
    const form = useForm({
        defaultValues: {
            displayName: displayNameInit
        }
    })

    const { register, handleSubmit } = form
    const onSubmit = async (data) => {
        try {
            const result = await userAuth.editInfor(data)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <InputField register={register} placeholder={displayNameInit} name={'displayName'} />
        </form>
    )
}
function CurrentAbout({ about }) {
    const aboutToArray = about.split('\n')
    const handleModalRef = useRef()

    return (
        <div className="flex justify-between">
            <p>{aboutToArray}</p>
            <AiOutlineEdit onClick={() => handleModalRef.current.openModal()} />
            <Modal ref={handleModalRef} Component={EditAboutBox} componentProps={{
                aboutInit: about
            }} />
        </div>

    )
}

function EditAboutBox({ aboutInit }) {
    const form = useForm({
        defaultValues: {
            about: aboutInit
        }
    })

    const { register, handleSubmit } = form
    const onSubmit = async (data) => {
        try {
            const result = await userAuth.editInfor(data)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <InputField register={register} placeholder={aboutInit} isTextarea={true} name={'about'} />
            <button>gui</button>
        </form>
    )
}

function CurrentProfile() {
    const user = useSelector(state => state.user.current.data)
    const userAge = new Date().getFullYear() - new Date(user.birthDay).getFullYear()
    const [userDataList, setuserDataList] = useState([])
    useEffect(() => {
        (async () => {
            const data = await userAuth.getAllUser()
            setuserDataList(data)
        })()

        return () => {

        }
    }, [])

    return (
        <div>
            <MakeFriendList listDataUser={userDataList} />
            <CurrentCoverAvatar coverAvatar={user.coverAvatar} />
            <CurrentAvatar avatarUrl={user.avatarUrl} />
            <p>{user.sex == 'male' ? 'Nam' : 'Nữ'}</p>
            <CurrentDisplayName displayName={user.displayName} />
            <CurrentAbout about={user.about} />
            <p>{userAge}</p>
            <p>{user.friend.length} friend</p>
            <Link to={'/'} >
                HOME
            </Link>

        </div>
    );
}

export default CurrentProfile;