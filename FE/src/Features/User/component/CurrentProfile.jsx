import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiCamera } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userAuth from '../../../Api/userAuthApi';
import CurrentFriendMini from '../../../Components/CurrentFriendMini';
import FriendListMini from '../../../Components/FriendListMini';
import InputField from '../../../Components/InputField';
import Modal from '../../../Components/Modal';
import instance from '../../../Constan/instance';
import useImgFile from '../../../hook/useImgFIle';
CurrentProfile.propTypes = {

};
function CurrentCoverAvatar({ coverAvatar }) {
    return (
        <div className="rounded-cover rounded-t-[0px]  overflow-hidden">
            <img src={coverAvatar} alt="" className='w-full h-full' />
        </div>
    )
}
function CurrentAvatar({ avatarUrl }) {
    const handleModal = useRef({})

    return (
        <div className="rounded-crical left-0 w-[168px] h-[168px] absolute top-[-34px] border-4 border-[#1c1e21] cursor-pointers">
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

        <div className="flex items-center">
            <p className='text-[#1c1e21] text-[32px] font-[700] leading-[32px]' > {displayName}</p>
            <AiOutlineEdit onClick={() => handleModalRef.current.openModal()} className='cursor-pointer ml-2 text-[20px] mt-1' />
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
        <div className='flex justify-center bg-white'>
            <div className="basis-[1024px]">
                <CurrentCoverAvatar coverAvatar={user.coverAvatar} />
                <div className="relative flex mx-10  pt-8 pb-8  border-solid border-b border-[#ccced2]">
                    <CurrentAvatar avatarUrl={user.avatarUrl} />
                    <div className="self-center ml-[180px]">
                        <CurrentDisplayName displayName={user.displayName} />
                        <p className='text-[#65676B] pt-[10px] '>{user.friend.length} Friends</p>
                        <CurrentFriendMini />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentProfile;