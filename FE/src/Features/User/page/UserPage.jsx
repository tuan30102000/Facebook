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
                setuser(userCurrent)
                setisExistUser(true)
            }
            if (!isOwner) {
                try {
                    const userData = await callApi([userId])
                    setuser(userData)
                } catch (error) {
                    setisExistUser(false)
                }
            }
            setisExistUser(true)

        })()

        return () => {
        }
    }, [userId, userCurrent])

    return (
        <>  <Loading isLoading={isLoading} />
            {(isExistUser && user._id) && <UserProfile {...{ user, isOwner, isLoading }} />}
            {!isExistUser && <div className="">User not found</div>}
        </>
    );
}

export default UserPage;