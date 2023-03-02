import PropTypes from 'prop-types';
import React from 'react';
import userAuth from '../../../Api/userAuthApi';
import Option from '../../../Components/Option';
import OptionBtn from '../../../Components/OptionBtn';
import ButtonHandleFriend from './ButtonHandleFriend';

AreadyRequestFriend.propTypes = {
    friendId: PropTypes.string.isRequired
};

function AreadyRequestFriend({ friendId }) {
    const cancelRequest = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await userAuth.cancelRequest(friendId)
        } catch (error) {

        }
    }

    const btnData = [
        {
            onClick: cancelRequest,
            text: 'Hủy lời mời'
        },
        ,
    ]
    return (
        <Option Component={OptionBtn} BtnComponent={ButtonHandleFriend} componentProp={{ btnData }} btnComponentProp={{ text: 'Đã gửi lời mời kết bạn' }} />
    );
}

export default AreadyRequestFriend;