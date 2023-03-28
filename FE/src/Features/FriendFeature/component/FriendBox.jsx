import React from 'react';
import MakeFriendList from './MakeFriendList';
import RequetFriendList from './RequetFriendList';

function FriendBox({ listFriendRequest = [] }) {
    return (
        <div className='py-5' >
            {!!listFriendRequest.length &&
                <RequetFriendList listFriendRequest={listFriendRequest} />
            }
            <MakeFriendList />
        </div>
    );
}

export default FriendBox;