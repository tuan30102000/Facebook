import React from 'react';
import { useSelector } from 'react-redux';
import FriendCard from '../../FriendFeature/component/FriendCard';

UserFriendTab.propTypes = {

};




function UserFriendTab({ friendList = [], friendSet, friendRequestSet, myFriendRequestSet }) {
    const user = useSelector(state => state.user.current.data)

    return (
        <div className='flex justify-center h-max mt-4' >
            <div className="basis-[1024px] px-8 justify-between gap-4">
                <div className="p-4 rounded-lg bg-white shadow">
                    <p className='text-[#050505] font-[600] text-[20px] mb-8' >Bạn bè</p>
                    <div className="flex flex-wrap">
                        {friendList.map(item => <FriendCard friendSet={friendSet} friendRequestSet={friendRequestSet} myFriendRequestSet={myFriendRequestSet} {...item} ownerId={user._id} key={item._id} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserFriendTab;