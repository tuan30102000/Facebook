import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import mapReverse from '../../../Constan/mapReverse';
import Message from './Message';

Messages.propTypes = {

};

function Messages({ messages = [], total, currentMember = {}, observer }) {
    const messageRef = useRef(null)
    const messageBoxRef = useRef(null)



  
    useEffect(() => {
        // messagesNode.scrollTop = messagesNode.scrollHeight;
        // observer.current.observe(messageRef.current)
        // console.log(observer)
        messageBoxRef.current.scrollTop = messageRef.current.scrollHeight
        return () => {
        }
    }, [messages])

    return (
        <div ref={messageBoxRef} className='flex-1 overflow-y-scroll'>
            <div ref={messageRef} className="">
                {mapReverse(messages, (item, i, arr) => <Message {...item} observer={observer} isLoad={i == arr.length - 1} currentMember={currentMember} key={item._id} />)}
            </div>
        </div>
    );
}

export default Messages;