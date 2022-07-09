import React, { } from 'react';
import PropTypes from 'prop-types';
import Option from '../../../Components/Option';
import OptionBtn from '../../../Components/OptionBtn';
import ButtonHandleFriend from './ButtonHandleFriend';
import userAuth from '../../../Api/userAuthApi';

AreadyFriendBtn.propTypes = {

};

function AreadyFriendBtn({ friendId }) {
    const removeFriend = async () => {
        try {
            await userAuth.removeFriend(friendId)
        } catch (error) {

        }
    }

    const btnData = [{
        onClick: removeFriend,
        text: 'Hủy kết bạn'
    }]
    return (
        <Option Component={OptionBtn} BtnComponent={ButtonHandleFriend} componentProp={{ btnData }} btnComponentProp={{ text: 'Bạn bè' }} />
    );
}

export default AreadyFriendBtn;