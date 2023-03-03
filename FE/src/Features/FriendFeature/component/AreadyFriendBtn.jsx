import React, { } from 'react';
import PropTypes from 'prop-types';
import Option from '../../../Components/Option';
import OptionBtn from '../../../Components/OptionBtn';
import ButtonHandleFriend from './ButtonHandleFriend';
import userAuth from '../../../Api/userAuthApi';
import useCallApi from '../../../hook/useCallApi';

AreadyFriendBtn.propTypes = {

};

function AreadyFriendBtn({ friendId }) {
    const { isLoading, callApi } = useCallApi(userAuth.removeFriend)
    const removeFriend = async (e) => {
        e.stopPropagation()
        try {
            await callApi([friendId])
        } catch (error) {
            console.log(error)
        }
    }
    const btnData = [{
        onClick: removeFriend,
        text: 'Hủy kết bạn', isLoading: isLoading
    }]
    return (
        <Option Component={OptionBtn} BtnComponent={ButtonHandleFriend} componentProp={{ btnData }} btnComponentProp={{ text: 'Bạn bè' }} />
    );
}

export default AreadyFriendBtn;