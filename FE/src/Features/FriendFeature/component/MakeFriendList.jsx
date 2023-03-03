import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userAuth from '../../../Api/userAuthApi';
import { LoadIcon } from '../../../Components/IconCustom/IconCustom';
import useCallApi from '../../../hook/useCallApi';
import { friendRequestSetSelector, friendSetSelector, myFriendRequestSetSelector } from '../../AuthFeature/selectors';
import HandleRelationshipBtn from './HandleRelationshipBtn';
import LinkToFriend from './LinkToFriend';

MakeFriendBox.propTypes = {

};

function MakeFriendBox({ friendId, avatarUrl, displayName }) {
    const user = useSelector(state => state.user.current.data)
    const friendSet = useSelector(friendSetSelector)
    const friendRequestSet = useSelector(friendRequestSetSelector)
    const myFriendRequestSet = useSelector(myFriendRequestSetSelector)
    return (
        <div className='flex justify-between py-2 px-5 ' >
            <LinkToFriend {...{ avatarUrl, friendId, displayName }} />
            <HandleRelationshipBtn _id={friendId} isOwner={false} {...{ friendSet, friendRequestSet, myFriendRequestSet }} />

        </div>
    );
}

function MakeFriendList() {
    const [listDataUser, setlistDataUser] = useState([])
    const { isLoading, callApi } = useCallApi(userAuth.getAllUser)
    useEffect(() => {
        (async () => {
            const data = await callApi()
            setlistDataUser(data)
        })()

        return () => {
        };
    }, [])
    return (
        <div className="">
            <p className="text-[20px] font-[700] mb-1 px-5">
                Gợi ý kết bạn
            </p>
            <LoadIcon isLoading={isLoading} />
            {listDataUser.map(item => <MakeFriendBox key={item._id} friendId={item._id} avatarUrl={item.avatarUrl} displayName={item.displayName} />)}
        </div>
    )
}

export default MakeFriendList;