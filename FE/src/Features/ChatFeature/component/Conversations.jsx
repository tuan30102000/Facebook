import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Conversation from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { loadConversations } from '../chatSlice';

Conversations.propTypes = {
};

function Conversations({ }) {
    const state = useSelector(state => state)
    const user = state.user.current.data
    const conversations = state.chat.conversations
    const dispatch = useDispatch()
    useEffect(() => {
        if (conversations.length == 0) {
            const action = loadConversations()
            dispatch(action)
        }
        return () => {
        }
    }, [conversations.length])
    return (
        <div>
            {conversations.map((item) => <Conversation  {...item} userId={user._id} key={item._id} />)}
        </div>
    );
}

export default Conversations;