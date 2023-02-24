import React from 'react';
import PropTypes from 'prop-types';
import MessageContent from './MessageContent';
import CricalImage from '../../../Components/CricalImage'
import clsx from 'clsx';
Message.propTypes = {
    sender: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    currentMember: PropTypes.object.isRequired
};

function Message({ content = '', sender = {}, currentMember = {} }) {
    const isUser = !(sender == currentMember._id)
    console.log(sender, currentMember._id, isUser)
    console.log(sender, currentMember._id)
    return (
        <div className={clsx('flex items-center')}>
            {!isUser && <CricalImage size={40} src={currentMember.avatarUrl} />}
            <MessageContent isUser={isUser} content={content} />
        </div>
    );
}

export default Message;