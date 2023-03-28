import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import CricalImage from '../../../Components/CricalImage';
import { useEffect } from 'react';
import { useRef } from 'react';
import dayjs from 'dayjs';

NotifyItem.propTypes = {

};

function NotifyItem({ message, user, _id, id, createTime, hasObserver, observer }) {
    const time = dayjs(createTime).fromNow(true)
    const elmRef = useRef({})
    const navigate = useNavigate()
    useEffect(() => {

        if (!hasObserver) return
        observer.observe(elmRef.current)
        return () => {
        }
    }, [hasObserver])
    const readNotify = (e) => {
        e.stopPropagation();

    }
    return (
        <div ref={elmRef} onClick={readNotify} className='flex items-center px-4 py-2 border-b hover:cursor-pointer border-gray-200'>
            <div className="flex-shrink-0 mr-3">
                <CricalImage size={60} src={user.avatarUrl} />
            </div>

            <div className="">
                <div className="text-[14px] text-gray-500"><Link to={`/profile/${user._id}`} className='font-bold capitalize text-black text-[16px] hover:underline' >{user.displayName}</Link> {message}</div>
                <div className="text-xs text-gray-500">{time}</div>
            </div>
        </div>
    );
}

export default NotifyItem;