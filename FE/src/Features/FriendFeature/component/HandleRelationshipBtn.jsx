import React from 'react';
import AddFriendBtn from './AddFriendBtn';
import AreadyFriendBtn from './AreadyFriendBtn';
import AreadyRequestFriend from './AreadyRequestFriend';
import HandleFriendRequestBtns from './HandleFriendRequestBtns';

function HandleRelationshipBtn({ _id, ownerId, friendSet, friendRequestSet, myFriendRequestSet }) {
    if (_id == ownerId) return <></>
    if (friendSet.has(_id)) return <AreadyFriendBtn friendId={_id} />
    if (friendRequestSet.has(_id)) return <HandleFriendRequestBtns friendId={_id} />
    if (myFriendRequestSet.has(_id)) return <AreadyRequestFriend friendId={_id} />
    return <AddFriendBtn friendId={_id} />
}

export default HandleRelationshipBtn;