import React, { } from 'react';
import PropTypes from 'prop-types';
import Option from '../../../Components/Option';
import OptionBtn from '../../../Components/OptionBtn';
import ButtonHandleFriend from './ButtonHandleFriend';
import userAuth from '../../../Api/userAuthApi';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../AuthFeature/userSlice';

AreadyRequestFriend.propTypes = {

};

function AreadyRequestFriend({ friendId }) {
    const dispatch = useDispatch()
    const cancelRequest = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await userAuth.cancelRequest(friendId)
            const action = updateUser(userNewest)
            dispatch(action)
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