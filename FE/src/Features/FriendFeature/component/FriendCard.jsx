import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import HandleRelationshipBtn from './HandleRelationshipBtn';

FriendCard.propTypes = {
    _id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    currentId: PropTypes.string,
    friendSet: PropTypes.object.isRequired,
    // friendRequestSet: PropTypes.fun.isRequireSd,
    myRequestFriendSet: PropTypes.object.isRequired,
};

function FriendCard({ _id, displayName, avatarUrl, ownerId, friendSet, friendRequestSet, myFriendRequestSet }) {
console.log(_id)
    return (
        <div className="flex flex-[0_0_50%] justify-between items-center p-4 rounded-lg shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)]">
            <Link className='flex' to={'/profile/' + _id} >
                <div className="w-[80px] h-[80px]">
                    <img src={avatarUrl} className='w-full h-full rounded-lg' alt="" />
                </div>
                <p className='self-center text-[#050505] font-[600]'>{displayName}</p>
            </Link>
            <HandleRelationshipBtn {...{ _id, ownerId, friendSet, friendRequestSet, myFriendRequestSet }} />
        </div>
    )
}

export default FriendCard;