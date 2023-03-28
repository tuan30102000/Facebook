import React, { useEffect } from 'react';
import ChatBox from './component/ChatBox';
import ConversationsBox from './component/ConversationsBox';

ChatPage.propTypes = {

};

function ChatPage() {
    useEffect(() => {
        document.body.scrollTop = 0
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'scroll'

        }
    }, [])
    return (
        <div className="flex w-full bg-white">
            <div className="w-[360px] bg-white border-[#0000001a] border-t-0 border-[1px]">
                <ConversationsBox />
            </div>
            <ChatBox />
        </div>
    );
}

export default ChatPage;