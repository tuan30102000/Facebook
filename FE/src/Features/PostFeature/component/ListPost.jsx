import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

ListPost.propTypes = {
    listPost: PropTypes.array,
    setPostData: PropTypes.func,
};

function ListPost({ listPost = [], setPostData }) {
    const deletePost = (postId) => {
        const clonePost = [...listPost]
        const newPostData = clonePost.filter(item => item._id != postId)
        setPostData(newPostData)
    }
    const updatePost = (post) => {
        const clonePost = [...listPost]
        const newPostData = [post, ...clonePost.filter(item => item._id != post._id)]
        setPostData(newPostData)
    }
    return (
        <div>
            {listPost.map((item) => <Post key={item._id} likeList={item.like} {...{ deletePost, updatePost }} avatarUrl={item.owner.avatarUrl} content={item.content} urlList={item.imgUrl} displayName={item.owner.displayName} postId={item._id} ownerId={item.owner._id} />)}
        </div>
    );
}

export default ListPost;