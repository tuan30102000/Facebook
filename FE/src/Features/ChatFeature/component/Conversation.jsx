import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CricalImage from '../../../Components/CricalImage';

Conversation.propTypes = {

};

function Conversation({ members, userId, newMessage, }) {
    const member = members.find(item => item._id != userId)
    return (
        <Link className='flex p-2 hover:bg-gray-100 rounded-[8px] overflow-hidden' to={'/chat/' + member._id} >
            <CricalImage size={60} src={member.avatarUrl} />
            <div className="self-center ml-3">
                <p className='font-[400] capitalize text-[#050505] mb-1' >{member.displayName}</p>
                <p className='font-[300] text-[14px] text-[#65676B] truncate w-[360px] leading-4' >{(newMessage.sender == userId ? 'Ban: ' : '') +newMessage.content }</p>
            </div>
        </Link>
    );
}
// method.limitText(newMessage.content, 20, '...')

export default Conversation;