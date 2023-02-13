import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';
import { useState } from 'react';

Comments.propTypes = {

};

function Comments({ comments = [], postId }) {
    return (
        <div>
            {comments.map((item) => <Comment postId={postId} key={item._id} {...item} />)}
        </div>
    );
}

export default Comments;