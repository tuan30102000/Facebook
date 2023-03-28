import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import chatApi from '../../../Api/chatApi';
import { useState } from 'react';
import userAuth from '../../../Api/userAuthApi';
import Messages from './Messages';
import MessageForm from './MessageForm';
import { useSelector } from 'react-redux';
import usePagination from '../../../hook/usePagination';
import NotExistConversation from './NotExistConversation';
import NavbarChat from './NavbarChat';
import useCallApi from '../../../hook/useCallApi';

ChatBox.propTypes = {

};

function ChatBox() {
    const params = useParams()
    const user = useSelector(state => state.user)
    const socket = user.socket
    const currentUser = user.current.data
    const [currentConversation, setcurrentConvertion] = useState({})
    const [messageList, setmessageList] = useState([])
    const [currentMember, setcurrentMember] = useState({})
    const [cursor, setcursor] = useState({})
    const { observer, page, setpage, } = usePagination(() => console.log(2222))
    const [loadMoreMessage, setloadMoreMessage] = useState([])
    const { isLoading, callApi } = useCallApi(chatApi.getMessage)
    useEffect(() => {
        //reset State 
        setmessageList([]);
        setloadMoreMessage([])
        setcurrentConvertion({})
        setpage(1);
        setcurrentMember({});
        (async () => {
            try {
                //check conversation        
                const data = await chatApi.checkConversation(params.memberId)
                //getDataMember
                const member = await userAuth.getUserById(params.memberId)
                setcurrentMember(member)
                setcurrentConvertion(data.conversation || {})
                setcursor({ time: data.conversation?.newMessage?.createTime })
                // console.log(data.conversation?.newMessage?.createTime)
            } catch (error) {
            }
        })()
        return () => {
        }
    }, [params.memberId])
    useEffect(() => {
        ; (async function getMessage() {
            if (!currentConversation._id) return
            const messagesList = await callApi([currentConversation._id, { page: page, limit: 10, cursor: cursor.time }])
            //first load
            if (page == 1) setmessageList(messages => [...messagesList.result])
            //load more
            if (page > 1) setloadMoreMessage(messages => [...messages, ...messagesList.result])
        })()
        return () => {
        }
    }, [cursor, page])

    useEffect(() => {
        if (!socket) return
        if (!currentConversation._id) return
        socket.emit('join-conversation', currentConversation._id)
        socket.on('create-message', (newMessage) => {
            setmessageList(state => [newMessage, ...state,])
        })
        socket.on('change-conversation', (cv) => {
            setcurrentConvertion(cv)

        })
        socket.on('delete-message', (cmtId) => {
            setmessageList(state => state.filter(item => item._id != cmtId))
        })

        return () => {
            socket.removeListener('create-message');
            socket.removeListener('delete-message');
            socket.removeListener('change-conversation');
            socket.emit('leave-conversation', currentConversation._id)
        }
    }, [currentConversation._id])


    const onsubmitForm = async (value) => {
        // if conversation not exist create end send message
        if (!currentConversation._id) {
            const data = await chatApi.createConversationAndMessage(params.memberId, value.message)
            setcurrentConvertion(data.conversation)
            setmessageList(state => [data.newMessage])
        }
        //if conversation exist
        if (currentConversation._id) {
            await chatApi.createMessage(value.message, currentConversation._id)
        }
    }
    const handleSeen = async (value) => {
        //checkSeen conversation
        if (!currentConversation._id) return
        if (currentConversation.seen) return
        //check is current user
        if (currentConversation.newMessage?.sender === currentUser._id) return
        try {
            await chatApi.seenConversation(currentConversation._id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex-[1] flex flex-col  h-[calc(100vh-59px)] relative' >
            <NavbarChat member={currentMember} />
            {!currentConversation?._id && <NotExistConversation member={currentMember} />}
            {<Messages isLoading={isLoading} loadMoreMessage={loadMoreMessage} observer={observer} currentMember={currentMember} messages={messageList} />}
            <MessageForm onFocus={handleSeen} onSubmit={onsubmitForm} />
        </div>
    );
}

export default ChatBox;