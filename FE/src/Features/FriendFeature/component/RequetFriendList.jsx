import React from 'react';
import PropTypes from 'prop-types';
import userAuth from '../../../Api/userAuthApi';
import { Link } from 'react-router-dom';

RequetFriendList.propTypes = {

};
function RequetFriendBox({ friendId, avatarUrl, displayName }) {
    const acceptFriend = async () => {
        try {
            const result = await userAuth.acceptFriend(friendId)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    const rejectFriend = async () => {
        try {
            const result = await userAuth.rejectFriend(friendId)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="">
            <Link className='flex' to={'/profile/' + friendId} >
                <div className="w-10 h-10">
                    <img src={avatarUrl} className='w-full h-full' alt="" />
                </div>
                <p>{displayName}</p>
            </Link>
            <button onClick={acceptFriend} >Đồng Ý</button>
            <button onClick={rejectFriend} >Từ chối</button>
        </div>
    )
}

function RequetFriendList({ listFriend = [] }) {
    return (
        <div>
            {listFriend.map(item => <RequetFriendBox key={item._id} friendId={item._id} avatarUrl={item.avatarUrl} displayName={item.displayName} />)}
        </div>
    );
}

export default RequetFriendList;