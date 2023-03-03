import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useImgFile from '../../../hook/useImgFIle';
import userAuth from '../../../Api/userAuthApi';
import useCallApi from '../../../hook/useCallApi';
import { LoadIcon } from '../../../Components/IconCustom/IconCustom';

EditAvatarBox.propTypes = {
    url: PropTypes.string.isRequired,
};

function EditAvatarBox({ url, submit, closeModal }) {
    const fileInputRef = useRef({})
    const { isLoading, callApi } = useCallApi(submit)
    const { onChange, imgPreview, file, isChange } = useImgFile(url)
    const onSend = async () => {
        try {
            if (!isChange) return
            await callApi([file])
            closeModal()
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
                <button className='mt-10 rounded-[6px] h-9 bg-primary-btn-bg text-white' onClick={() => fileInputRef.current.click()}>
                   Chọn ảnh
                </button>
                <button disabled={isLoading}  className="mt-10 block w-full rounded-[6px] h-9 bg-primary-btn-bg text-white" onClick={onSend}> {isLoading ? <LoadIcon isLoading={isLoading} /> : 'Gửi'}</button>
            </div>
        </div>
    )
}
export default EditAvatarBox;