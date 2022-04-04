import React from 'react';
import { useSelector } from 'react-redux';
import UserInfoMini from './UserInfoMini';


function UserCurrentInfoMini() {
    const user = useSelector(state => state.user.current.data)
    return (
        <>
            <UserInfoMini avartUrl={user.avatarUrl} userId={user._id} displayName={user.displayName} />
        </>
    );
}

export default UserCurrentInfoMini;