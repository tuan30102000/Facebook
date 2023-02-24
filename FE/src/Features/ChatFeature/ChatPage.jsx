import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import chatApi from '../../Api/chatApi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import userAuth from '../../Api/userAuthApi';
import Messages from './component/Messages';

ChatPage.propTypes = {

};

function ChatPage(props) {
    const params = useParams()
    const [currentConversation, setcurrentConvertion] = useState(null)
    const [messageList, setmessageList] = useState([])
    const [currentMember, setcurrentMember] = useState(null)
    const form = useForm({ defaultValues: { message: '' } })
    const { handleSubmit, register } = form
    useEffect(() => {
        (async () => {
            try {
                const data = await chatApi.checkConversation(params.memberId)
                const member = await userAuth.getUserById(params.memberId)
                setcurrentMember(member)
                setcurrentConvertion(data.conversation)
                getMessage(data.conversation)
            } catch (error) {

            }
        })()
        return () => {
        }
    }, [params.memberId])

    async function getMessage(conversation) {
        if (!conversation) return
        const messagesList = await chatApi.getMessage(conversation._id)
        console.log(messagesList)
        setmessageList(messagesList)
    }
    const onsubmitForm = async (value) => {
        // e.preventDefault();
        if (!currentConversation) {
            const data = await chatApi.createConversationAndMessage(params.memberId, value.message)
            setcurrentConvertion(data.conversation)
        }
        if (currentConversation) {
            const message = await chatApi.createMessage(value.message, currentConversation._id)
        }
    }

    return (
        <div>
            <Messages currentMember={currentMember} messages={messageList} />
            <form onSubmit={handleSubmit(onsubmitForm)}>
                <input  {...register('message')} placeholder='Aa' type="text" />
                <button>Send</button>
            </form>
        </div>
    );
}

export default ChatPage;