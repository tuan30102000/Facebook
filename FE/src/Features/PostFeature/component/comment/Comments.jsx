import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';


Comments.propTypes = {

};

function Comments({ comments = [], postId, user, ownerPost }) {
    return (
        <div className='overflow-y-auto h-max max-h-64'>
            {comments.map((item) => <Comment isOwnerPost={user._id == ownerPost} postId={postId} isOwnerComment={user._id == item.owner._id} key={item._id} {...item} />)}
        </div>
    );
}

export default Comments;