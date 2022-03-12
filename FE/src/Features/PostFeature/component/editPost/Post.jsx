import React from 'react';
import PropTypes from 'prop-types';
import UserInfoMini from '../../../../Components/UserInfoMini';
import { useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import Option from '../../../../Components/Option';
Post.propTypes = {

};

function Post({ content = '', urlList = [], avatarUrl, displayName, postId, ownerId }) {
    const user = useSelector(state => state.user)
    const isOwnerPost = user.current.data._id == ownerId
    return (
        <div className='relative w-[500px]'>
            <UserInfoMini avartUrl={avatarUrl} displayName={displayName} />
            <div className="">{content}</div>
            <div className="flex w-full">
                {urlList.map((item, key) => (
                    <div className='flex-1 h-[150px]' key={key} >
                        <img src={item} className='w-full h-full object-cover' alt="" />
                    </div>
                ))}
            </div>
            {isOwnerPost && <Option />}
        </div>
    );
}

export default Post;