import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CurrentProfile from '../component/CurrentProfile';

UserPage.propTypes = {

};

function UserPage() {
    const { userId } = useParams()
    const user = useSelector(state => state.user)
    const isOwner = userId === user.current.data._id
    return (
        <>
            {isOwner && <CurrentProfile />}
        </>
    );
}

export default UserPage;