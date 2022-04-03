import React from 'react';
import { useSelector } from 'react-redux';
import Option from '../../../Components/Option';
import UserInfoMini from '../../../Components/UserInfoMini';
import OptionPost from './editPost/OptionPost';

Post.propTypes = {

};

function Post({ content = '', urlList = [], avatarUrl, displayName, postId, ownerId, deletePost, updatePost }) {
    const user = useSelector(state => state.user)
    const isOwnerPost = user.current.data._id == ownerId
    return (
        <div className='relative w-[500px]'>
            <UserInfoMini avartUrl={avatarUrl} displayName={displayName} />
            <div className="">{content}</div>
            <div className="flex w-full">
                {urlList.map((item, key) => (
                    <div className='flex-1 h-[650px]' key={key} >
                        <img src={item} className='w-full h-full object-cover' alt="" />
                    </div>
                ))}
            </div>
            {isOwnerPost && <Option Component={OptionPost} componentProp={{ postId, urlList, content, deletePost, updatePost }} />}
        </div>
    );
}

export default Post;