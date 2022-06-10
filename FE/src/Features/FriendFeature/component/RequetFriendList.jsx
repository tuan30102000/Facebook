import React from 'react';
import HandleFriendRequestBtns from './HandleFriendRequestBtns';
import LinkToFriend from './LinkToFriend';

RequetFriendList.propTypes = {

};
function RequetFriendItem({ friendId, avatarUrl, displayName }) {

    return (
        <div className="flex px-5 py-2 justify-between">
            <LinkToFriend {...{ avatarUrl, friendId, displayName }} />
            <HandleFriendRequestBtns friendId={friendId} />
        </div>
    )
}

function RequetFriendList({ listFriendRequest = [] }) {
    return (
        <div className='mb-4' >
            <p className="text-[24px] font-[700] mb-3 px-5">
                Lời mời kết bạn
            </p>
            {listFriendRequest.map(item => <RequetFriendItem key={item._id} friendId={item._id} avatarUrl={item.avatarUrl} displayName={item.displayName} />)}
        </div>
    );
}

export default RequetFriendList;