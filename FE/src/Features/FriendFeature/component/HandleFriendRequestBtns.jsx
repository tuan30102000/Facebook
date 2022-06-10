import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../AuthFeature/userSlice';
import userAuth from '../../../Api/userAuthApi';
import ButtonHandleFriend from './ButtonHandleFriend';

HandleFriendRequestBtns.propTypes = {
    friendId: PropTypes.string.isRequired,
};

function HandleFriendRequestBtns({ friendId }) {
    const dispatch = useDispatch()
    const acceptFriend = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await userAuth.acceptFriend(friendId)
            const action = updateUser(userNewest)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
    const rejectFriend = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await userAuth.rejectFriend(friendId)
            const action = updateUser(userNewest)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
    const dataBtns = [
        {
            text: 'Đồng ý',
            onClick: acceptFriend
        },
        {
            text: 'Từ chối',
            onClick: rejectFriend,
            primaryBg: false
        },
    ]

    return (
        <div className="flex gap-2">
            {dataBtns.map((item, i) => <ButtonHandleFriend {...item} key={i} />
            )}
        </div>
    );
}

export default HandleFriendRequestBtns;