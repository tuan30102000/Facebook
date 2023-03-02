import React, { useState } from 'react';
import { useRef } from 'react';
import { memo } from 'react';
import { useEffect } from 'react';
import mapReverse from '../../../Constan/mapReverse';
import Message from './Message';

Messages.propTypes = {

};

function Messages({ messages = [], currentMember = {}, loadMoreMessage = [], observer, }) {
    const messageRef = useRef(null)
    const messageBoxRef = useRef(null)


    const allMessages = [...messages, ...loadMoreMessage]

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
                {mapReverse(allMessages, (item, i, arr) => <Message {...item} observer={observer} isLoad={i == arr.length - 1} currentMember={currentMember} key={item._id} />)}
            </div>
        </div>
    );
}

export default memo(Messages);