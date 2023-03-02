import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import chatApi from '../../Api/chatApi';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import userAuth from '../../Api/userAuthApi';
import Messages from './component/Messages';
import ConversationsBox from './component/ConversationsBox';
import MessageForm from './component/MessageForm';
import usePagination from '../../hook/usePagination';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import ChatBox from './component/ChatBox';

ChatPage.propTypes = {

};

function ChatPage(props) {
    useEffect(() => {
        document.body.scrollTop = 0
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'scroll'

        }
    }, [])
    return (
        <div className="flex w-full bg-white">
            <div className="w-[360px] bg-white border-[#0000001a] border-[1px]">
                <ConversationsBox />
            </div>
            <ChatBox />
        </div>
    );
}

export default ChatPage;