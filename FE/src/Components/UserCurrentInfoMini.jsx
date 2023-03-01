import React from 'react';
import { useSelector } from 'react-redux';
import UserInfoMini from './UserInfoMini';


function UserCurrentInfoMini({ isShowName = true }) {
    const user = useSelector(state => state.user.current.data)
    return (
        <>
            <UserInfoMini avatarUrl={user.avatarUrl} userId={user._id} displayName={isShowName ? user.displayName : ''} />
        </>
    );
}

export default UserCurrentInfoMini;