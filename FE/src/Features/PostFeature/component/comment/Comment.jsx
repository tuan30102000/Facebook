import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserInfoMini from '../../../../Components/UserInfoMini';
import Option from '../../../../Components/Option';
import OptionBtn from '../../../../Components/OptionBtn';
import CommentForm from './CommentForm';
import clsx from 'clsx';
import postApi from '../../../../Api/postApi';
import dayjs from 'dayjs'
Comment.propTypes = {

};

function Comment({ _id, content, owner, postId, isOwnerComment, isOwnerPost, createdAt, updatedAt }) {
    // console.log(new Date(createdAt), dayjs(updatedAt).fromNow())
    const [isEdit, setisEdit] = useState(false)
    const editClick = () => setisEdit(true)
    const closeEdit = () => setisEdit(false)
    const removeComment = async () => {
        try {
            await postApi.removeComment(postId, _id)
        } catch (error) {
            console.log(error)
        }
    }
    const editComment = async (value,) => {
        try {
            await postApi.editComment(postId, _id, value.comment)
            closeEdit()
        } catch (error) {
            setisLoading(false)
            console.log(error)
        }
    }
    const btnData = [
        { text: 'Chỉnh sửa', onClick: editClick },
        { text: 'Xóa', onClick: removeComment },
    ]
    const btnForOwnerPost = [{ text: 'Xoa', onClick: removeComment }]



    return (
        <div className='flex items-center mb-4 relative'>
            <UserInfoMini avatarUrl={owner.avatarUrl} userId={owner._id} />
            <div className={clsx("bg-[#F0F2F5] px-3 py-2 rounded-[12px]", { 'max-w-full': !isEdit, 'w-full': isEdit })}>
                <UserInfoMini displayName={owner.displayName} isMargin={false} userId={owner._id} />
                {!isEdit && <p className='break-all max-w-[400px]'>{content}</p>}
                {isEdit && <CommentForm postId={_id} defaultValues={content} submit={editComment} />}
            </div>
            {isOwnerComment && <Option Component={OptionBtn} componentProp={{ btnData }} />}
            {(!isOwnerComment && isOwnerPost) && <Option Component={OptionBtn} componentProp={{ btnData: btnForOwnerPost }} />}
            {isEdit && <p className='absolute top-[calc(100%-12px)] hover:underline cursor-pointer left-10' onClick={closeEdit}>Hủy</p>}
        </div>
    );
}

export default Comment; 