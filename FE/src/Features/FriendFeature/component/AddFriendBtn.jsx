import PropTypes from 'prop-types';
import React from 'react';
import userAuth from '../../../Api/userAuthApi';
import ButtonHandleFriend from './ButtonHandleFriend';

AddFriendBtn.propTypes = {
    friendId: PropTypes.string.isRequired
};

function AddFriendBtn({ friendId }) {
    const onClick = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await userAuth.addFriend(friendId)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ButtonHandleFriend text='Thêm bạn bè' onClick={onClick} />

    );
}

export default AddFriendBtn;