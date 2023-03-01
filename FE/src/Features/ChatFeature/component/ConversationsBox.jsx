import React, { } from 'react';
import PropTypes from 'prop-types';
import Conversations from './Conversations';

ConversationsBox.propTypes = {

};

function ConversationsBox(props) {


    return (
        <div className='px-2 rounded-[16px] max-w-[500px] overflow-y-scroll'>
            <p className='px-3 text-[25px] font-bold'>Chat</p>
            <Conversations />
        </div>
    );
}

export default ConversationsBox;