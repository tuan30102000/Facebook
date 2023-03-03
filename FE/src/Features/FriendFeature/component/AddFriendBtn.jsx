import PropTypes from 'prop-types';
import React from 'react';
import userAuth from '../../../Api/userAuthApi';
import useCallApi from '../../../hook/useCallApi';
import ButtonHandleFriend from './ButtonHandleFriend';

AddFriendBtn.propTypes = {
    friendId: PropTypes.string.isRequired
};

function AddFriendBtn({ friendId }) {
   const {isLoading,callApi} = useCallApi(userAuth.addFriend)
    const onClick = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await callApi([friendId])

        } catch (error) {
        }
    }
    return (
        <ButtonHandleFriend isLoading={isLoading} text='Thêm bạn bè' onClick={onClick} />
    );
}

export default AddFriendBtn;