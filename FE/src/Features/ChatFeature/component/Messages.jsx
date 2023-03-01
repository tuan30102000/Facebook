import React, { useState } from 'react';
import { useRef } from 'react';
import { memo } from 'react';
import { useEffect } from 'react';
import mapReverse from '../../../Constan/mapReverse';
import Message from './Message';

Messages.propTypes = {

};

function Messages({ messages = [], total, currentMember = {}, messagesRef, observer, isScroll, offScroll }) {
    const messageRef = useRef(null)
    const messageBoxRef = useRef(null)




    useEffect(() => {
        // messagesNode.scrollTop = messagesNode.scrollHeight;
        // observer.current.observe(messageRef.current)
        // console.log(observer)
        if(!isScroll) return
        messagesRef.current.scrollTop = messageRef.current.scrollHeight
        return () => {
        }
    }, [isScroll, messages])

    return (
        <div ref={messagesRef} className='flex-1 overflow-y-scroll'>
            <div ref={messageRef} className="">
                {mapReverse(messages, (item, i, arr) => <Message {...item} observer={observer} isLoad={i == arr.length - 1} currentMember={currentMember} key={item._id} />)}
            </div>
        </div>
    );
}

export default memo(Messages);