import React from 'react';
import userAuth from '../../../Api/userAuthApi';
import ButtonHandleFriend from './ButtonHandleFriend';
import LinkToFriend from './LinkToFriend';

RequetFriendList.propTypes = {

};
function RequetFriendItem({ friendId, avatarUrl, displayName }) {
    const acceptFriend = async (e) => {
        e.stopPropagation()
        try {
            const result = await userAuth.acceptFriend(friendId)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    const rejectFriend = async (e) => {
        e.stopPropagation()
        try {
            const result = await userAuth.rejectFriend(friendId)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex px-5 py-2 justify-between">
            <LinkToFriend {...{ avatarUrl, friendId, displayName }} />
            <div className="flex gap-2">
                <ButtonHandleFriend text='Đồng ý' onClick={acceptFriend} />
                <ButtonHandleFriend text='Từ chối' onClick={rejectFriend} />
            </div>
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