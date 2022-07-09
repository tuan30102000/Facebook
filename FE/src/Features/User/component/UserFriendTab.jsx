import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import method from '../../../Constan/method';
import FriendCard from '../../FriendFeature/component/FriendCard';

UserFriendTab.propTypes = {

};




function UserFriendTab({ friendList = [] }) {
    const user = useSelector(state => state.user.current.data)
    const friendSet = method.createSet(user.friend, '_id')
    const friendRequestSet = method.createSet(user.friendRequest, '_id')
    const myFriendRequestSet = method.createSet(user.myRequestFriends)
    return (
        <div className='flex justify-center h-max mt-4' >
            <div className="basis-[1024px] px-8 justify-between gap-4">
                <div className="p-4 rounded-lg bg-white shadow">
                    <p className='text-[#050505] font-[600] text-[20px] mb-8' >Bạn bè</p>
                    <div className="flex flex-wrap">
                        {friendList.map(item => <FriendCard friendSet={friendSet} friendRequestSet={friendRequestSet} myRequestFriendSet={myFriendRequestSet} {...item} ownerId={user._id} key={item._id} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserFriendTab;