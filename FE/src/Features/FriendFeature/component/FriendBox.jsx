import React from 'react';
import MakeFriendList from './MakeFriendList';
import RequetFriendList from './RequetFriendList';

function FriendBox({ listFriendRequest = [] }) {
    return (
        <>
            {!!listFriendRequest.length &&
                <RequetFriendList listFriendRequest={listFriendRequest} />
            }
            <MakeFriendList />
        </>
    );
}

export default FriendBox;