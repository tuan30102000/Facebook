import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Conversations from './Conversations';

ConversationsBox.propTypes = {

};

function ConversationsBox(props) {


    return (
        <div className="h-[calc(100vh-60px)] overflow-hidden">
            <p className='px-3 text-[25px] font-bold'>Chat</p>
            <div className='px-2 rounded-[16px] max-w-[500px] h-full  overflow-y-scroll'>
                <Conversations />
            </div>
        </div>
    );
}

export default memo(ConversationsBox);