import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MessageContent from './MessageContent';
import CricalImage from '../../../Components/CricalImage'
import clsx from 'clsx';
Message.propTypes = {
    sender: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    currentMember: PropTypes.object.isRequired
};

function Message({ content = '', observer, sender = {}, currentMember = {}, isLoad = false }) {
    const elmRef = useRef(null)
    const isUser = !(sender == currentMember._id)
    console.log(2)
    useEffect(() => {
        if (isLoad) {
            observer.observe(elmRef.current)
            return () => {
            }
        }

    }, [isLoad])

    return (
        <div ref={elmRef} className={clsx('flex items-center message-item')}>
            {!isUser && <CricalImage size={40} src={currentMember.avatarUrl} />}
            <MessageContent isUser={isUser} content={content} />
        </div>
    );
}

export default Message;