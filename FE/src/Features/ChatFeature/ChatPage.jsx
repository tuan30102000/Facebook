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

ChatPage.propTypes = {

};

function ChatPage(props) {
    const params = useParams()
    const user = useSelector(state => state.user)
    const socket = user.socket
    const currentUser = user.current.data
    const [currentConversation, setcurrentConvertion] = useState({})
    const [messageList, setmessageList] = useState([])
    const [currentMember, setcurrentMember] = useState(null)
    const [cursor, setcursor] = useState({})
    const { observer, page, setpage, } = usePagination()
    const messagesRef = useRef(null)
    const [isScroll, setisScroll] = useState(true)
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'scroll'

        }
    }, [])

    useEffect(() => {
        //reset State 
        setmessageList([]);
        setcurrentConvertion({})
        setpage(1);
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
            const messagesList = await chatApi.getMessage(currentConversation._id, { page: page, limit: 15, cursor: cursor.time })
            setmessageList(messages => [...messages, ...messagesList.result])
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
        // e.preventDefault();
        // if conversation not exist create end send message
        if (!currentConversation._id) {
            const data = await chatApi.createConversationAndMessage(params.memberId, value.message)
            setcurrentConvertion(data.conversation)
            setmessageList(state => [data.newMessage])
            setisScroll(true)
        }
        //if conversation exist
        if (currentConversation._id) {
            await chatApi.createMessage(value.message, currentConversation._id)
        }
    }
    const handleSeen = async (value) => {
        //checkSeen conversation
        if (currentConversation.seen) return
        //check is current user
        if (currentConversation.newMessage?.sender === currentUser._id) return
        console.log('seen')
        try {
            await chatApi.seenConversation(currentConversation._id)
        } catch (error) {
            console.log(error)
        }
    }
    const offScroll = () => setisScroll(false)

    return (
        <div className="flex w-full bg-white">
            <div className="w-[360px] bg-white">
                <ConversationsBox />
            </div>
            <div className='flex-[1] flex flex-col  h-[calc(100vh-59px)]' >
                {messageList[0] && <Messages messagesRef={messagesRef} isScroll={isScroll} offScroll={offScroll} observer={observer} messages={messageList} />}
                <MessageForm onFocus={handleSeen} onSubmit={onsubmitForm} />
            </div>
        </div>
    );
}

export default ChatPage;