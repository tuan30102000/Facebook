import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import userAuth from '../../../Api/userAuthApi';
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
                setuser(userCurrent)
                setisExistUser(true)
            }
            if (!isOwner) {
                try {
                    const userData = await userAuth.getUserById(userId)
                    console.log(userData)
                    setuser(userData)
                } catch (error) {
                    console.log(error)
                    setisExistUser(false)
                }
            }
            setisExistUser(true)

        })()

        return () => {
        }
    }, [userId])

    return (
        <>
            {(isExistUser && user._id) && <UserProfile {...{ user, isOwner }} />}
            {!isExistUser && <div className="">User not found</div>}
        </>
    );
}

export default UserPage;