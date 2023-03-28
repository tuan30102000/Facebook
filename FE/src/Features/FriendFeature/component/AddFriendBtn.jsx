import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import userAuth from '../../../Api/userAuthApi';
import Loading from '../../../Components/Loading';
import useCallApi from '../../../hook/useCallApi';
import ButtonHandleFriend from './ButtonHandleFriend';

AddFriendBtn.propTypes = {
    friendId: PropTypes.string.isRequired
};

function AddFriendBtn({ friendId }) {
    const { isLoading, callApi } = useCallApi(userAuth.addFriend)

    const onClick = useCallback(async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await callApi([friendId])
            // const userNewest = await callApi([friendId])

        } catch (error) {
            console.log(error)
        }
    })
    return (
        <ButtonHandleFriend text='Thêm bạn bè' isLoading={isLoading} onClick={onClick} />
    );
}

export default AddFriendBtn;