import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Option from '../../../Components/Option';
import UserInfoMini from '../../../Components/UserInfoMini';
import OptionPost from './editPost/OptionPost';
import PostInterativeControlBox from './PostInterativeControlBox';
import instance from '../../../Constan/instance';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri'
import { MdOutlinePublic } from 'react-icons/md'
import { FaUserFriends } from 'react-icons/fa'
import { useEffect } from 'react';
Post.propTypes = {
    content: PropTypes.string,
    imgUrl: PropTypes.array,
    _id: PropTypes.string.isRequired,
    owner: PropTypes.object,
    like: PropTypes.array,
    deletePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    sendNotify: PropTypes.array
};
function PrivateIcon({ privateType }) {
    const iconts = {
        [instance.typePrivate[0]]: MdOutlinePublic,
        [instance.typePrivate[1]]: FaUserFriends,
        [instance.typePrivate[2]]: RiGitRepositoryPrivateLine,
    }
    const Cpn = iconts[privateType]
    return <Cpn className='text-[14px] self-center ml-2 mb-1' />
}
function Post({ content = '', initIsShowComment = false, sendNotify, imgUrl = [], updateFieldPost, privateType, like = [], _id, owner, deletePost, updatePost }) {
    const user = useSelector(state => state.user.current.data)
    const isOwnerPost = user._id == owner._id
    const arrayOfContent = content.split('\n')
    const isLikePost = like.includes(user._id)
    const handleReact = () => {
        updateFieldPost(_id, user._id, 'like', !isLikePost)
    }
    return (

        <div className='sm:w-[550px] bg-white rounded-[5px] shadow mb-3 mx-auto'>
            <div className="px-4 pt-3">
                <div className="flex  mb-3">
                    <UserInfoMini avatarUrl={owner.avatarUrl} userId={owner._id} displayName={owner.displayName} />
                    {isOwnerPost && <PrivateIcon privateType={privateType} />}
                    <Option Component={OptionPost} componentProp={{ _id, user, updateFieldPost, sendNotify, imgUrl, content, userId: user._id, deletePost, updatePost, isOwnerPost, privateType }} />
                </div>
                <div className="pt-1 pb-2">{arrayOfContent.map((item, i) => <div key={i} className='select-text leading-5' >{item}</div>)}</div>
            </div>
            {imgUrl[0] &&
                <div className="flex w-full">
                    {imgUrl.map((item, key) => (
                        <div className='flex-1' key={key} >
                            <img src={item} className='w-full h-auto object-cover' alt="" />
                        </div>
                    ))}
                </div>}
            <PostInterativeControlBox initIsShowComment={initIsShowComment} isLikePost={isLikePost} postId={_id} ownerPost={owner._id} handleReact={handleReact} />
        </div>
    );
}

export default Post;
