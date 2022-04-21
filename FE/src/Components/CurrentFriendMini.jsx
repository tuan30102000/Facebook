import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FriendListMini from './FriendListMini';

CurrentFriendMini.propTypes = {

};

function CurrentFriendMini() {
    const user = useSelector(state=>state.user.current.data)
    return (
        <>
            <FriendListMini friendList={user.friend} />
        </>
    );
}

export default CurrentFriendMini;