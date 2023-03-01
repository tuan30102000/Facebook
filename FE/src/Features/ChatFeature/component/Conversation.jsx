import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CricalImage from '../../../Components/CricalImage';
import clsx from 'clsx';
import { TickCricle } from '../../../Components/IconCustom/IconCustom';
import dayjs from 'dayjs';

Conversation.propTypes = {

};

function Conversation({ members, userId, newMessage, seen,  }) {
    const member = members.find(item => item._id != userId)
    const time = dayjs(newMessage.createTime).fromNow(true)
    const isSender = userId == newMessage.sender
    const isReceiver = member._id == newMessage.sender
    const isHiglight = isReceiver && !seen
    const isSenderAndNotSeen = isSender && !seen
    const isSenderAndSeen = isSender && seen
    // console.log(isHiglight, member._id, newMessage.sender, seen)
    return (
        <Link
            className='flex p-2 hover:bg-gray-100 rounded-[8px] overflow-hidden max-w-[360px]'
            to={'/chat/' + member._id} >
            <CricalImage size={60} src={member.avatarUrl} />
            <div
                className="self-center ml-3">
                <p
                    className={clsx('capitalize text-[#050505] mb-1',
                        {
                            'font-[700]': isHiglight,
                            'font-[400]': !isHiglight
                        })}
                >{member.displayName}</p>
                <div className="flex items-center">
                    <p
                        className={clsx('text-[14px] truncate max-w-[150px] leading-4',
                            {
                                'text-[#65676B] font-[300]': !isHiglight,
                                'text-higlight font-[500]': isHiglight
                            })} >{(newMessage.sender == userId ? 'Ban: ' : '') + newMessage.content}</p>
                    <p className='text-[12px] text-[#65676B] ml-2 font-[100]'>{time}</p>
                </div>

            </div>
            {isHiglight && <div
                className="rounded-crical w-3 h-3 ml-auto self-center bg-higlight"></div>}
            {isSenderAndNotSeen && <div
                className="rounded-crical w-3 h-3 ml-auto self-center">
                <TickCricle color={'#BCC0C4'} />
            </div>}
            {isSenderAndSeen && <div
                className="rounded-crical w-3 h-3 ml-auto self-center">
                <CricalImage src={member.avatarUrl} size={16} />
            </div>}

        </Link>
    );
}
// method.limitText(newMessage.content, 20, '...')

export default Conversation;
// 