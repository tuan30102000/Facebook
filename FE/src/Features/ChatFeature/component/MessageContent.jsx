import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

MessageContent.propTypes = {

};
// #E4E6EB
// #050505
function MessageContent({ content, isUser = false }) {
    return (
        <p className={clsx('w-min max-w-450 break-words text-[15px] px-3 py-2 rounded-[18px] my-3', {
            'bg-[#0084ff] ml-auto text-white': isUser,
            'bg-[#E4E6EB] text-primary': !isUser
        })} >
            {content}
        </p>
    );
}

export default MessageContent;