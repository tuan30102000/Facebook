import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import userAuth from '../../Api/userAuthApi';
import Header from '../../Components/Header/Header';
import method from '../../Constan/method';
import UserCard from './UserCard';

SearchPage.propTypes = {

};

function SearchPage(props) {
    const location = useLocation()
    const [listUser, setlistUser] = useState([])
    const user = useSelector(state => state.user.current.data)
    const friendSet = method.createSet(user.friend, '_id')
    const friendRequestSet = method.createSet(user.friendRequest, '_id')
    const myFriendRequestSet = method.createSet(user.myRequestFriends)
    useEffect(() => {
        if (!location.search) return
        (async () => {
            try {
                const userListSearch = await userAuth.search(location.search)
                setlistUser(userListSearch)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [location.search])
    return (
        <div>
            <Header />
            <div className='flex justify-center'>
                <div className="basis-[1024px]">
                    {!location.search && <p>This page not exit</p>}
                    {location.search && 
                    <div className="">
                        {listUser.map((item) => <UserCard {...{ friendRequestSet, myFriendRequestSet, friendSet, ownerId: user._id }} key={item._id} {...item} />)}
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;