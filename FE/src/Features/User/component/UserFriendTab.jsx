import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Option from '../../../Components/Option';

UserFriendTab.propTypes = {

};


function FriendCard({ friendId, displayName, avatarUrl }) {
    const { userId } = useParams()
    const userCurrent = useSelector(state => state.user.current.data)
    const isOwner = userId === userCurrent._id
    return (
        <div className="flex flex-1 justify-between items-center p-4 rounded-lg shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)]">
            <Link className='flex' to={'/profile/' + friendId} >
                <div className="w-[80px] h-[80px]">
                    <img src={avatarUrl} className='w-full h-full rounded-lg' alt="" />
                </div>
                <p className='self-center text-[#050505] font-[600]'>{displayName}</p>
            </Link>
            {isOwner &&
                <Option />
            }
        </div>
    )
}

function UserFriendTab({ friendList = [] }) {


    return (
        <div className='flex justify-center h-max mt-4' >
            <div className="basis-[1024px] px-8 justify-between gap-4">
                <div className="p-4 rounded-lg bg-white shadow">
                    <p className='text-[#050505] font-[600] text-[20px] mb-8' >Bạn bè</p>
                    <div className="flex gap-2">
                        {friendList.map(item => <FriendCard {...item} key={item._id} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserFriendTab;