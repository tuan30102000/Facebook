import React from 'react';
import PropTypes from 'prop-types';
import Conversation from './Conversation';
import { useSelector } from 'react-redux';

Conversations.propTypes = {
    conversations: PropTypes.array
};

function Conversations({ conversations = [] }) {
    const user = useSelector(state=>state.user.current.data)
    return (
        <div>
            {conversations.map((item) => <Conversation  {...item} userId={user._id} key={item._id} />)}
        </div>
    );
}

export default Conversations;