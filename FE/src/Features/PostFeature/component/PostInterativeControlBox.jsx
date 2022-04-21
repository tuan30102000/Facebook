import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiComment } from 'react-icons/bi'
import clsx from 'clsx';
import postApi from '../../../Api/postApi';

PostInterativeControlBox.propTypes = {
    isLikePost: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
    handleReact: PropTypes.func.isRequired,
};
function LikeBox() {

    return ({

    })
}

function PostInterativeControlBox({ postId, isLikePost, handleReact }) {
    // const [showComment, setShowComment] = useState(false);
    const spanStyle = 'text-[15px] font-[600] ml-[10px]'
    const likeColor = 'text-[#2078f4]'
    const parrentStyle = "flex flex-1 items-center justify-center leading-[15px] cursor-pointer"
    const action = isLikePost ? 'unlike' : 'like'
    const onLikeClick = async () => {
        try {
            const message = await postApi.reactPost(action, postId)
            console.log(message)
            handleReact(action)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="px-4">
            <div className='flex border-solid border-t border-[#00000026] h-[44px]' >
                <div onClick={onLikeClick} className={clsx(parrentStyle)}>
                    <BiLike className={clsx('text-[18px]', { [likeColor]: isLikePost })} />
                    <span className={clsx(spanStyle, { [likeColor]: isLikePost })}>Thích</span>
                </div>
                <div className={clsx(parrentStyle)}>
                    <BiComment className='text-[18px]' />
                    <span className={spanStyle} >Bình Luận</span>
                </div>
            </div>
        </div>
    );
}

export default PostInterativeControlBox;