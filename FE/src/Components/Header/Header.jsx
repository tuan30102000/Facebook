import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { FaFacebook, FaUserFriends } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { RiMessengerFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { countMessageNotSeen } from '../../Features/ChatFeature/chatSelector';
import { loadConversations } from '../../Features/ChatFeature/chatSlice';
import ConversationsBox from '../../Features/ChatFeature/component/ConversationsBox';
import FriendBox from '../../Features/FriendFeature/component/FriendBox';
import Dialog from '../Dialog';
import SettingBox from '../SettingBox';
import SearchBox from './SearchBox';
Header.propTypes = {

};
IconBox.propTypes = {
    onClick: PropTypes.func,
    IconComponent: PropTypes.func.isRequired,
    count: PropTypes.number,
}

function IconBox({ onClick = () => { }, IconComponent, count = 0 }) {
    const isMany = count > 9
    return (
        <div onClick={onClick} className="relative w-10 h-10 bg-[#E4E6EB] rounded-crical flex items-center justify-center cursor-pointer">
            <IconComponent className={'text-[20px]'} />
            {count > 0 && <div className={clsx('min-w-[19px] h-[19px] flex justify-center items-center w-max bg-red-600 text-white font-600 text-[13px] px-[5px] leading-[13px] absolute top-[-5px] right-[-5px]', { 'rounded-[100px]': isMany, 'rounded-crical': !isMany })}>{isMany ? '9+' : count}</div>}
        </div>
    )
}

function Header() {
    const state = useSelector(state => state)
    const user = state.user.current.data
    const conversations = state.chat.conversations
    const dispatch = useDispatch()
    useEffect(() => {
        if (conversations.length == 0) {
            console.log(2)
            const action = loadConversations()
            dispatch(action)
        }
        return () => {
        }
    }, [conversations.length])
    const conversationSeenCount = useSelector(countMessageNotSeen)

    const displayNameLink = user.displayName.split(' ')?.[1] || user.displayName
    const handleFriendDialogRef = useRef({})
    const handleSettingDialogRef = useRef({})
    const handleConversationRef = useRef({})
    const openSettingDialog = () => {
        handleSettingDialogRef.current.openModal()
    }
    const openConversations = () => {
        handleConversationRef.current.openModal()
    }
    return (
        <header className='fixed z-50 h-[60px] bg-white left-0 w-full top-0 shadow-sm px-4 flex items-center justify-between'>
            <div className="flex h-full items-center">
                <Link className='w-max h-max mr-2' to={'/'}>
                    <FaFacebook className='text-[#0b84ee] text-[40px]' />
                </Link>
                <SearchBox />
            </div>
            <div className="flex w-max h-max gap-2">
                <Link to={`/profile/${user._id}`} className='h-9 flex items-center pr-3 pl-1 rounded-[18px] gap-1 hover:bg-gray-200'>
                    <div className="h-7 w-7 overflow-hidden rounded-crical border-solid border border-gray-300">
                        <img src={user.avatarUrl} className='w-full h-full' alt="" />
                    </div>
                    <span className='text-[15px] text-[#050505] font-bold'>{displayNameLink}</span>
                </Link>
                <IconBox onClick={() => { handleFriendDialogRef.current.openModal() }} count={user.friendRequest.length} IconComponent={FaUserFriends} />
                <IconBox onClick={openConversations} count={conversationSeenCount} IconComponent={RiMessengerFill} />
                <IconBox IconComponent={IoMdNotifications} />
                <IconBox onClick={openSettingDialog} IconComponent={BsFillCaretDownFill} />
            </div>
            <Dialog Component={FriendBox} componentProps={{ listFriendRequest: user.friendRequest }} ref={handleFriendDialogRef} />
            <Dialog Component={SettingBox} ref={handleSettingDialogRef} />
            <Dialog Component={ConversationsBox} ref={handleConversationRef} />
        </header>
    );
}

export default Header;