import React from 'react';
import { useSelector } from 'react-redux';
import UserInfoMini from './UserInfoMini';


function UserCurrentInfoMini() {
    const user = useSelector(state => state.user)
    return (
        <>
            <UserInfoMini avartUrl={user.current.data.avatarUrl} displayName={user.current.data.displayName} />
        </>
    );
}

export default UserCurrentInfoMini;