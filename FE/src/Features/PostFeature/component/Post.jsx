import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Option from '../../../Components/Option';
import UserInfoMini from '../../../Components/UserInfoMini';
import OptionPost from './editPost/OptionPost';
import PostInterativeControlBox from './PostInterativeControlBox';

Post.propTypes = {
    content: PropTypes.string,
    urlList: PropTypes.array,
    avartUrl: PropTypes.string,
    displayName: PropTypes.string,
    postId: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
};

function Post({ content = '', urlList = [], avatarUrl, displayName, likeList = [], postId, ownerId, deletePost, updatePost }) {
    const user = useSelector(state => state.user.current.data)
    const [likeListState, setLikeListState] = useState(likeList);
    const isOwnerPost = user._id == ownerId
    const arrayOfContent = content.split('\n')
    // const addLikeList = () => {
    //     const likeListCLone = likeListState
    //     const newLikeList = [...likeListCLone, user._id]
    //     setLikeListState(newLikeList)
    // }
    // const removeLikeList = () => {
    //     const likeListCLone = likeListState
    //     const newLikeList = likeListCLone.filter(item => !item != user._id)
    //     setLikeListState(newLikeList)
    // }

    const handleReact = (action) => {
        if (action == 'like') {
            const likeListCLone = likeListState
            const newLikeList = [...likeListCLone, user._id]
            return setLikeListState(newLikeList)
        }

        if (action == 'unlike') {
            const likeListCLone = likeListState
            const newLikeList = likeListCLone.filter(item => item != user._id)
            return setLikeListState(newLikeList)
        }
    }
    return (

        <div className='w-[600px] bg-white rounded-[5px] shadow mb-3 mx-auto'>
            <div className="px-4 pt-3">
                <div className="flex justify-between mb-3">
                    <UserInfoMini avartUrl={avatarUrl} userId={ownerId} displayName={displayName} />
                    {isOwnerPost && <Option Component={OptionPost} componentProp={{ postId, urlList, content, deletePost, updatePost }} />}
                </div>
                <div className="pt-1 pb-4">{arrayOfContent.map((item, i) => <div key={i} className='select-text leading-5' >{item}</div>)}</div>
            </div>
            {urlList[0] &&
                <div className="flex w-full">
                    {urlList.map((item, key) => (
                        <div className='flex-1 h-[650px]' key={key} >
                            <img src={item} className='w-full h-full object-cover' alt="" />
                        </div>
                    ))}
                </div>}
            <PostInterativeControlBox isLikePost={likeListState.includes(user._id)} postId={postId} handleReact={handleReact} />
        </div>
    );
}

export default Post;
