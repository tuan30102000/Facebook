import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import chatApi from '../../Api/chatApi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import userAuth from '../../Api/userAuthApi';
import Messages from './component/Messages';
import ConversationsBox from './component/ConversationsBox';
import MessageForm from './component/MessageForm';
import usePagination from '../../hook/usePagination';
import { useSelector } from 'react-redux';

ChatPage.propTypes = {

};

function ChatPage(props) {
    const params = useParams()
    const socket = useSelector(state => state.user.socket)
    const [currentConversation, setcurrentConvertion] = useState({})
    const [messageList, setmessageList] = useState([])
    const [currentMember, setcurrentMember] = useState(null)
    const { observer, page, setpage, } = usePagination()
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'scroll'

        }
    }, [])

    useEffect(() => {
        setmessageList([]);
        setcurrentConvertion({})
        setpage(1);
        // setisLoad(true);
        (async () => {
            try {
                const data = await chatApi.checkConversation(params.memberId)
                const member = await userAuth.getUserById(params.memberId)
                setcurrentMember(member)
                setcurrentConvertion(data.conversation || {})
            } catch (error) {
            }
        })()
        return () => {
        }
    }, [params.memberId])

    // useEffect(() => {

    //     setpage(1)
    //     return () => {
    //     }
    // }, [params.memberId])
    useEffect(() => {
        ; (async function getMessage() {
            if (!currentConversation._id) return
            // console.log(currentConversation.newMessage.createTime)
            socket.emit()
            const messagesList = await chatApi.getMessage(currentConversation._id, { page: page, limit: 15, cursor: currentConversation.newMessage?.createTime })
            setmessageList(messages => [...messages, ...messagesList.result])
        })()
        return () => {
        }
    }, [currentConversation._id, page])
    useEffect(() => {
        if (!socket) return
        if (!currentConversation._id) return
        socket.emit('join-conversation', currentConversation._id)
        socket.on('create-message', (newMessage) => {
            // const newmessageList = [...messages, newCmt]
            setmessageList(state => [newMessage, ...state,])
        })
        socket.on('change-conversation', (cv) => {
            // const newmessageList = [...messages, newCmt]
            console.log(cv)

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
        if (!currentConversation._id) {
            const data = await chatApi.createConversationAndMessage(params.memberId, value.message)
            setcurrentConvertion(data.conversation)
            setmessageList(state => [data.newMessage])
        }
        if (currentConversation._id) {
            chatApi.createMessage(value.message, currentConversation._id)
        }
    }
    const handleSeen = async (value) => {
        try {
            await chatApi.seenConversation(currentConversation._id)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex w-full bg-white">
            <div className="w-[360px] bg-white">
                <ConversationsBox />
            </div>
            <div className='flex-[1] flex flex-col  h-[calc(100vh-59px)]' >
                <Messages observer={observer} currentMember={currentMember} messages={messageList} />
                <MessageForm onFocus={handleSeen} onSubmit={onsubmitForm} />
            </div>
        </div>
    );
}

export default ChatPage;