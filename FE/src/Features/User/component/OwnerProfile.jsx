import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

OwnerProfile.propTypes = {

};

function OwnerProfile() {
    const user = useSelector(state => state.user.current.data)
    const userAge= new Date().getFullYear()-new Date(user.birthDay).getFullYear()
    console.log(userAge)
    return (
        <div>
            <div className="">
                <img src={user.coverAvatar} alt="" />
            </div>
            <div className="rounded-crical w-[150px] h-[150px] cursor-pointer overflow-hidden">
                <img src={user.avatarUrl} alt="" />
            </div>
            <p>{user.sex=='male' ?'Nam' :'Nữ'}</p>
            <p>{user.displayName}</p>
            <p>{user.about}</p>
            <p>{userAge}</p>
            <Link to={'/'} >
                HOME
            </Link>

        </div>
    );
}

export default OwnerProfile;