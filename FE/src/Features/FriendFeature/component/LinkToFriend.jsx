import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

LinkToFriend.propTypes = {
    friendId: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    displayName:PropTypes.string.isRequired,
};

function LinkToFriend({ friendId, avatarUrl, displayName }) {
    return (
        <Link className='flex gap-1' to={'/profile/' + friendId} >
            <div className="w-10 h-10">
                <img src={avatarUrl} className='w-full h-full rounded-crical' alt="" />
            </div>
            <p className='self-center'>{displayName}</p>
        </Link>
    );
}

export default LinkToFriend;