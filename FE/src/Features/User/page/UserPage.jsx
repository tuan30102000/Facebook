import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import userApi from '../../../Api/userApi';
import userAuth from '../../../Api/userAuthApi';
import Loading from '../../../Components/Loading';
import useCallApi from '../../../hook/useCallApi';
import UserProfile from '../component/UserProfile';

UserPage.propTypes = {

};

function UserPage() {
    const { userId } = useParams()
    const userCurrent = useSelector(state => state.user.current.data)
    const [user, setuser] = useState({})
    const [isExistUser, setisExistUser] = useState(true)
    const isOwner = userId === userCurrent._id
    const { isLoading, callApi } = useCallApi(userAuth.getUserById)
    useEffect(() => {
        (async () => {
            if (isOwner) {
                setuser({})
                setisExistUser(true)
            }
            if (!isOwner) {
                try {
                    const userData = await callApi([userId])
                    setuser(userData)
                    setisExistUser(true)
                } catch (error) {
                    setuser({})
                    setisExistUser(false)
                }
            }

        })()

        return () => {
        }
    }, [userId])

    return (
        <>  <Loading isLoading={isLoading} />
            {(isExistUser) &&
                <>
                    {user._id && <UserProfile {...{ isOwner, isLoading }} user={user} />}
                    {(!user._id) && <UserProfile {...{ isOwner, isLoading }} user={userCurrent} />}
                </>}
            {!isExistUser && <div className="text-center mt-10 text-2xl ">User not found</div>}
        </>
    );
}

export default UserPage;