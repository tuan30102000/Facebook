import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

MessageContent.propTypes = {
    content: PropTypes.string.isRequired,
    isUser: PropTypes.bool
};
// #E4E6EB
// #050505
function MessageContent({ content, isUser = false }) {
    return (
        <p className={clsx('max-w-450 break-words text-[15px] px-3 py-2 w-max rounded-[18px] my-3', {
            'bg-[#0084ff] ml-auto text-white': isUser,
            'bg-[#E4E6EB] ml-2 text-primary': !isUser
        })} >
            {content}
        </p>
    );
}

export default MessageContent;