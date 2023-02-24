import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import chatApi from '../../../Api/chatApi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Conversations from './Conversations';

ConversationsBox.propTypes = {

};

function ConversationsBox(props) {
    const [conversations, setconversations] = useState([])
    useSelector(state => state.user)
    useEffect(() => {
        (async () => {
            const conversationsFromApi = await chatApi.getConversations()
            setconversations(conversationsFromApi)
        })()
        return () => {
        }
    }, [])

    return (
        <div className='px-2 rounded-[16px] max-w-[500px]'>
            <p className='px-3 text-[25px] font-bold'>Chat</p>
            <Conversations conversations={conversations} />
        </div>
    );
}

export default ConversationsBox;