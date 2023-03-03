import React from 'react';
import PropTypes from 'prop-types';
import { updateUser } from '../../AuthFeature/userSlice';
import userAuth from '../../../Api/userAuthApi';
import ButtonHandleFriend from './ButtonHandleFriend';
import useCallApi from '../../../hook/useCallApi';

HandleFriendRequestBtns.propTypes = {
    friendId: PropTypes.string.isRequired,
};

function HandleFriendRequestBtns({ friendId }) {
    const accepctFnc = useCallApi(userAuth.acceptFriend)
    const rejectFnc = useCallApi(userAuth.rejectFriend)
    const acceptFriend = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await accepctFnc.callApi([friendId])
        } catch (error) {
            console.log(error)
        }
    }
    const rejectFriend = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await rejectFnc.callApi([friendId])
        } catch (error) {
            console.log(error)
        }
    }
    const dataBtns = [
        {
            text: 'Đồng ý',
            onClick: acceptFriend,
            isLoading: accepctFnc.isLoading
        },
        {
            text: 'Từ chối',
            onClick: rejectFriend,
            primaryBg: false,
            isLoading: rejectFnc.isLoading
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