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
    const updateFieldPost = (postId, pushItem, field, isAdd) => {
        const clonePost = [...listPost]
        const index = clonePost.findIndex(item => item._id == postId)
        if (isAdd) clonePost[index][field].push(pushItem)
        if (!isAdd) clonePost[index][field] = clonePost[index][field].filter(item => item != pushItem)
        setPostData(clonePost)
    }
    return (
        <div>
            {listPost.map((item) => <Post key={item._id} {...{ deletePost, updatePost, updateFieldPost }} {...item} />)}
        </div>
    );
}

export default ListPost;