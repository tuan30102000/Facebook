import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useImgFile from '../../../hook/useImgFIle';
import userAuth from '../../../Api/userAuthApi';

EditAvatarBox.propTypes = {
    avatarUrl: PropTypes.string.isRequired,
};

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
export default EditAvatarBox;