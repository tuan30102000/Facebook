import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import userAuth from '../../../Api/userAuthApi';
import { updateUser } from '../../AuthFeature/userSlice';
import ButtonHandleFriend from './ButtonHandleFriend';
import LinkToFriend from './LinkToFriend';

MakeFriendBox.propTypes = {

};

function MakeFriendBox({ friendId, avatarUrl, displayName }) {
    const dispatch = useDispatch()
    const onClick = async (e) => {
        e.stopPropagation()
        try {
            const userNewest = await userAuth.addFriend(friendId)
            const action = updateUser(userNewest)
            dispatch(action)
        } catch (error) {

        }
    }
    return (
        <div className='flex justify-between py-2 px-5 ' >
            <LinkToFriend {...{ avatarUrl, friendId, displayName }} />

            <ButtonHandleFriend text='Thêm bạn bè' onClick={onClick} />

        </div>
    );
}

function MakeFriendList() {
    const [listDataUser, setlistDataUser] = useState([])
    useEffect(() => {
        (async () => {
            const data = await userAuth.getAllUser()
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
            {listDataUser.map(item => <MakeFriendBox key={item._id} friendId={item._id} avatarUrl={item.avatarUrl} displayName={item.displayName} />)}
        </div>
    )
}

export default MakeFriendList;