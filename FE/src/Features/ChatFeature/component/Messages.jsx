import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import Message from './Message';

Messages.propTypes = {

};

function Messages({ messages = [], currentMember = {} }) {
    const messageRef = useRef(null)
    useEffect(() => {
        // messagesNode.scrollTop = messagesNode.scrollHeight;
        messageRef.current.scrollTop = messageRef.current.scrollHeight
        return () => {
        }
    }, [messages])

    return (
        <div ref={messageRef} className='max-h-[700px] overflow-y-scroll'>
            {messages.map(item => <Message {...item} currentMember={currentMember} key={item._id} />)}
        </div>
    );
}

export default Messages;