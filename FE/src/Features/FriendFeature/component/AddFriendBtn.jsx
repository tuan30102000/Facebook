import React from 'react';
import PropTypes from 'prop-types';
import ButtonHandleFriend from './ButtonHandleFriend';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../AuthFeature/userSlice';
import userAuth from '../../../Api/userAuthApi';

AddFriendBtn.propTypes = {

};

function AddFriendBtn({friendId}) {
    const dispatch = useDispatch()
    const onClick = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await userAuth.addFriend(friendId)
            const action = updateUser(userNewest)
            dispatch(action)
        } catch (error) {

        }
    }
    return (
        <ButtonHandleFriend text='Thêm bạn bè' onClick={onClick} />

    );
}

export default AddFriendBtn;