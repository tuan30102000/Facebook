import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CricalImage from '../../../Components/CricalImage';
import clsx from 'clsx';

Conversation.propTypes = {

};

function Conversation({ members, userId, newMessage, seen }) {
    const member = members.find(item => item._id != userId)
    const isHiglight = member._id == newMessage.sender && !seen
    return (
        <Link className='flex p-2 hover:bg-gray-100 rounded-[8px] overflow-hidden' to={'/chat/' + member._id} >
            <CricalImage size={60} src={member.avatarUrl} />
            <div className="self-center ml-3">
                <p className={clsx('capitalize text-[#050505] mb-1',
                    {
                        'font-[700]': isHiglight,
                        'font-[400]': !isHiglight
                    })}
                >{member.displayName}</p>
                <p className={clsx('text-[14px] truncate max-w-[360px] leading-4',
                    {
                        'text-[#65676B] font-[300]': !isHiglight,
                        'text-higlight font-[500]': isHiglight
                    })} >{(newMessage.sender == userId ? 'Ban: ' : '') + newMessage.content}</p>
            </div>
            {isHiglight && <div className="rounded-crical w-3 h-3 ml-auto self-center bg-higlight"></div>}
        </Link>
    );
}
// method.limitText(newMessage.content, 20, '...')

export default Conversation;
// 