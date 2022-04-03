import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

OwnerProfile.propTypes = {

};

function OwnerProfile() {
    const user = useSelector(state => state.user.current.data)
    return (
        <div>
            <div className="rounded-crical w-[150px] h-[150px] cursor-pointer overflow-hidden">
                <img src={user.avatarUrl} alt="" />
            </div>
            <p>{user.displayName}</p>
            <Link to={'/'} >
                HOME
            </Link>
        </div>
    );
}

export default OwnerProfile;