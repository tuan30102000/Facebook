import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import CricalImage from '../../../Components/CricalImage';
import { useEffect } from 'react';
import { useRef } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { readNotify } from '../notifySlice';
import clsx from 'clsx';

NotifyItem.propTypes = {

};

function NotifyItem({ message, user, _id, type, id, reads = [], createTime, hasObserver, observer }) {
    const time = dayjs(createTime).fromNow(true)
    const userCurrent = useSelector(state => state.user.current.data)
    const elmRef = useRef({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isRead = reads.includes(userCurrent._id)
    useEffect(() => {
        if (!hasObserver) return
        observer.observe(elmRef.current)
        return () => {
        }
    }, [hasObserver])

    const readCurrentNotify = (e) => {
        e.stopPropagation()
        dispatch(readNotify(_id))
    }
    const handleNavigate = (e) => {
        if (type === 'post') navigate('/post/' + id, { replace: true })
    }
    return (
        <div ref={elmRef} onClick={handleNavigate}
            className={clsx('flex items-center px-4 py-2 border-b hover:cursor-pointer border-gray-200',
                { 'opacity-50': isRead }
            )}>
            <div className="flex-shrink-0 mr-3">
                <CricalImage size={60} src={user.avatarUrl} />
            </div>

            <div className="">
                <div className="text-[14px] text-gray-500"><Link to={`/profile/${user._id}`} onClick={(e) => e.stopPropagation()} className='font-bold capitalize text-black text-[16px] hover:underline' >{user.displayName}</Link> {message}</div>
                <div className="text-xs text-gray-500">{time}</div>
            </div>
            {!isRead && <div onClick={readCurrentNotify} className="rounded-crical bg-blue-500 w-3 h-3 ml-auto"></div>}
        </div>
    );
}

export default NotifyItem;