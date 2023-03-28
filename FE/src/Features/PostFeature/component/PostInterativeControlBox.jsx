import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiComment } from 'react-icons/bi'
import clsx from 'clsx';
import postApi from '../../../Api/postApi';
import CommentBox from './comment/CommentBox';
import useCallApi from '../../../hook/useCallApi';

PostInterativeControlBox.propTypes = {
    isLikePost: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
    handleReact: PropTypes.func.isRequired,
};
function LikeBox() {

    return ({

    })
}

function PostInterativeControlBox({ postId, isLikePost, handleReact, ownerPost, initIsShowComment = false }) {
    const [isShowComment, setisShowComment] = useState(initIsShowComment);
    const spanStyle = 'text-[15px] font-[600] ml-[10px]'
    const likeColor = 'text-[#2078f4]'
    const parrentStyle = "flex flex-1 items-center justify-center leading-[15px] cursor-pointer"
    const action = isLikePost ? 'unlike' : 'like'
    const { isLoading, callApi } = useCallApi(postApi.reactPost)
    const onLikeClick = async () => {
        try {
            await callApi([action, postId])
            handleReact()
        } catch (error) {
            console.log(error)
        }
    }
    const onCommentClick = () => {
        setisShowComment(state => !state)
    }
    return (
        <>
            <div className="px-4 mt-2">
                <div className='flex border-solid border-y border-[#00000026] h-[44px]' >
                    <div onClick={onLikeClick} className={clsx(parrentStyle)}>
                        <BiLike className={clsx('text-[18px]', { [likeColor]: isLikePost })} />
                        <span className={clsx(spanStyle, { [likeColor]: isLikePost })}>Thích</span>
                    </div>
                    <div onClick={onCommentClick} className={clsx(parrentStyle)}>
                        <BiComment className={clsx('text-[18px]', {
                            [likeColor]: isShowComment,
                        })} />
                        <span className={clsx(spanStyle, { [likeColor]: isShowComment })} >Bình Luận</span>
                    </div>
                </div>
            </div>
            {isShowComment && <CommentBox postId={postId} ownerPost={ownerPost} />}
        </>
    );
}

export default PostInterativeControlBox;