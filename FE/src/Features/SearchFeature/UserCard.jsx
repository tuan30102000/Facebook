import React from 'react';
import PropTypes from 'prop-types';
import UserInfoMini from '../../Components/UserInfoMini';
import HandleRelationshipBtn from '../FriendFeature/component/HandleRelationshipBtn';
UserCard.propTypes = {

};

function UserCard({ avatarUrl, displayName, _id, about, friendRequestSet, myFriendRequestSet, friendSet, ownerId }) {

    return (
        <div className='flex px-4 w-[600px] h-[92px] shadow rounded-md bg-white mt-2 mx-auto items-center'>
            <UserInfoMini avatarUrl={avatarUrl} userId={_id} avtSize='w-[60px] h-[60px]' />
            <div className="">
                <UserInfoMini userId={_id} displayName={displayName} />
                <p className='ml-2'>{about}</p>

            </div>
            <div className="ml-auto">
            <HandleRelationshipBtn {...{ friendRequestSet, myFriendRequestSet, friendSet, _id, ownerId }} />
            </div>
        </div>
    );
}

export default UserCard;