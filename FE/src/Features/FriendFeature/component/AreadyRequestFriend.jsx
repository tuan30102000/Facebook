import React, { } from 'react';
import PropTypes from 'prop-types';
import Option from '../../../Components/Option';
import OptionBtn from '../../../Components/OptionBtn';
import ButtonHandleFriend from './ButtonHandleFriend';
import userAuth from '../../../Api/userAuthApi';

AreadyRequestFriend.propTypes = {

};

function AreadyRequestFriend({ friendId }) {
    const cancelRequest = async () => {
        try {
            await userAuth.cancelRequest(friendId)
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