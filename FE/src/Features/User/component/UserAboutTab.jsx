import dayjs from "dayjs";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser, AiFillEdit } from 'react-icons/ai'
import { FaBirthdayCake } from 'react-icons/fa'
import userAuth from "../../../Api/userAuthApi";
import InputField from "../../../Components/InputField";
import Modal from "../../../Components/Modal";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from "clsx";
import { updateUserInfo } from "../../AuthFeature/userSlice";
import { useDispatch } from "react-redux";
import useCallApi from "../../../hook/useCallApi";
import { LoadIcon } from "../../../Components/IconCustom/IconCustom";
import { FaMale, FaFemale } from 'react-icons/fa'
UserAboutTab.propTypes = {

};

const regexWhiteSpace = /^\S+$/
const schema = yup.object().shape({
    displayName: yup.string().required('vuilong nhap ten').test('check name', 'vui long nhap ho ten day du', (value) => value.split(' ').length >= 2)
    ,
})
const data = [
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
]

function EditInforBox({ initValue, name, isTextarea = false, label, submit, closeModal, schema }) {
    const form = useForm({
        defaultValues: {
            [name]: initValue,
            resolver: yupResolver(schema)
        },
    })
    const { isLoading, callApi } = useCallApi(submit)
    const { register, handleSubmit, formState } = form
    const { errors } = formState
    const onSubmit = async (data) => {
        try {
            const result = await callApi([data, name])
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <InputField label={label} register={register} errors={errors} placeholder={initValue} isTextarea={isTextarea} name={name} />
            <button disabled={isLoading} className="h-8 disabled:opacity-60 bg-primary-btn-bg rounded-[6px]  text-white px-3" >
                {!isLoading && 'Gửi'}
                <LoadIcon isLoading={isLoading} />
            </button>
        </form>
    )
}
// function EditDisplayNameBox({ displayNameInit, closeModal }) {
//     const form = useForm({
//         defaultValues: {
//             displayName: displayNameInit
//         }, resolver: yupResolver(schema)
//     })

//     const { register, handleSubmit } = form
//     const onSubmit = async (data) => {
//         try {
//             const result = await userAuth.editInfor(data)
//             closeModal()
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="">
//             <InputField register={register} placeholder={displayNameInit} name={'displayName'} />
//             <p className="text-red-400" ></p>
//         </form>
//     )
// }
function AboutLine({ Icon = AiOutlineUser, content, isEdit, field, onEdit, isName = false }) {

    return (
        <div className="h-12 flex items-center justify-between">
            <p className="flex" ><Icon className='text-[20px]' /><span className="ml-3" >{field}: </span><span className={clsx('font-bold', { 'capitalize': isName })}>{content}</span></p>

            {isEdit && <button> <AiFillEdit onClick={onEdit} /></button>}
        </div>

    )
}

function UserAboutTab({ about, displayName, birthDay, isOwner, sex }) {
    const handleDisplayNameModalRef = useRef(null)
    const handleAboutModalRef = useRef(null)
    const openDisplayNameModal = () => handleDisplayNameModalRef.current.openModal()
    const openAboutModal = () => handleAboutModalRef.current.openModal()
    const dispatch = useDispatch()
    const change = async (data, name) => {
        try {
            const result = await userAuth.editInfor(data)
            dispatch(updateUserInfo({ key: name, data: result[name] }))

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex justify-center h-max mt-3' >

            <div className="basis-[1024px] px-8 h-[500px] bg-white rounded-md shadow p-3">
                <AboutLine onEdit={openDisplayNameModal} isName={true} content={displayName} isEdit={isOwner} field={'Họ và Tên'} />
                <AboutLine onEdit={openAboutModal} content={about} isEdit={isOwner} field={'Giới thiệu'} />
                <AboutLine Icon={FaBirthdayCake} isEdit={false} content={dayjs(birthDay).format('DD/MM/YYYY')} field={'Sinh nhật'} />
                <AboutLine Icon={sex == 'male' ? FaMale : FaFemale} isEdit={false} content={sex == 'male' ? 'Nam' : 'Nữ'} field={'Giới tính'} />
                {/* <p>Ngày sinh: <span>{dayjs(birthDay).format('DD/MM/YYYY')}</span></p> */}
                {isOwner && <>
                    <Modal ref={handleAboutModalRef} Component={EditInforBox} componentProps={{
                        initValue: about, name: 'about', label: 'Về tôi', submit: change, isTextarea: true,
                    }} />
                    <Modal ref={handleDisplayNameModalRef} Component={EditInforBox} componentProps={{
                        initValue: displayName, name: 'displayName', label: 'Họ Và Tên', submit: change, isTextarea: false, schema: schema
                    }} />
                </>}
            </div>
        </div>
    );
}

export default UserAboutTab;