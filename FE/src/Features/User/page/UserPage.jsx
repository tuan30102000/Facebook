import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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