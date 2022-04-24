import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import userAuth from '../../../Api/userAuthApi';
import CurrentProfile from '../component/CurrentProfile';
import UserProfile from '../component/UserProfile';

UserPage.propTypes = {

};

function UserPage() {
    const { userId } = useParams()
    const userCurrent = useSelector(state => state.user.current.data)
    const [user, setuser] = useState({})
    const [isExistUser, setisExistUser] = useState(true)
    const isOwner = userId === userCurrent._id
    useEffect(() => {
        (async () => {
            if (isOwner) {
                setisExistUser(true)
                setuser(userCurrent)
                return
            }
            try {
                const userData = await userAuth.getUserById(userId)
                console.log(userData)
                setuser(userData)
            } catch (error) {
                console.log(error)
                setisExistUser(false)
            }

        })()

        return () => {
        }
    }, [userId])

    return (
        <>
            {(isExistUser && user._id) && <UserProfile {...{ user, isOwner }} />}
            {!isExistUser && <div className="">user not found</div>}
        </>
    );
}

export default UserPage;