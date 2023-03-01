import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';


Comments.propTypes = {

};

function Comments({ comments = [], postId, user, ownerPost }) {
    return (
        <div>
            {comments.map((item) => <Comment isOwnerPost={user._id == ownerPost} postId={postId} isOwnerComment={user._id == item.owner._id} key={item._id} {...item} />)}
        </div>
    );
}

export default Comments;