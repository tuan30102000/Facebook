import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import postApi from '../../../Api/postApi';
import userAuth from '../../../Api/userAuthApi';
import FriendListMini from '../../../Components/FriendListMini';
import useCallApi from '../../../hook/useCallApi';
import { friendRequestSetSelector, friendSetSelector, myFriendRequestSetSelector } from '../../AuthFeature/selectors';
import HandleRelationshipBtn from '../../FriendFeature/component/HandleRelationshipBtn';
import Avatar from './Avatar';
import ButtonList from './ButtonList';
import CoverAvatar from './CoverAvatar';
import DisplayName from './DisplayName';
import UserAboutTab from './UserAboutTab';
import UserFriendTab from './UserFriendTab';
import UserPostsTab from './UserPostsTab';

UserProfile.propTypes = {
    isOwner: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

function UserProfile({ isOwner = false, user }) {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const friendSet = useSelector(friendSetSelector)
    const friendRequestSet = useSelector(friendRequestSetSelector)
    const myFriendRequestSet = useSelector(myFriendRequestSetSelector)
    const { isLoading, callApi } = useCallApi(postApi.getPostUser)
    // navigate({ search: `?${createSearchParams({ sk: 'friend' })}` })
    const [posts, setPosts] = useState([])
    const searchParams = useMemo(() => {
        const seach = queryString.parse(location.search)
        // console.log(seach)
        const param = {
            ...seach,
        }
        return param
    }, [location.search])

    useEffect(() => {
        (async () => {
            const postUsers = await callApi([user._id])
            setPosts(postUsers)
        })()
        return () => {
        }
    }, [user._id])

    const changeQuerryParams = (params) => {

        params
            ? navigate({
                search: `?${createSearchParams({ sk: params })}`,
            })
            : navigate({})
    }
    return (
        <>
            <div className='flex justify-center bg-white shadow'>
                <div className="basis-[1024px]">
                    <CoverAvatar isOwner={isOwner} coverAvatar={user.coverAvatar} />
                    <div className="relative flex mx-10  pt-8 pb-8  border-solid border-b border-[#ccced2]">
                        <Avatar isOwner={isOwner} avatarUrl={user.avatarUrl} />
                        <div className="self-center ml-[180px]">
                            <DisplayName displayName={user.displayName} />
                            <Link className='text-[#65676B] font-[600] pt-[10px] hover:underline' to='?sk=friends'>{user.friend.length} Bạn bè</Link>
                            <FriendListMini friendList={user.friend} />
                            {/* <Link to={'/profile/62581c15de652906e05650ed?sk='} >aa</Link> */}
                        </div>
                        {!isOwner && <>
                            <div className="ml-auto flex">
                                <HandleRelationshipBtn _id={user._id} isOwner={isOwner} {...{ friendSet, friendRequestSet, myFriendRequestSet }} />
                                <Link to={'/chat/' + params.userId} className={'ml-3 h-10 items-center rounded-[6px] bg-[#E4E6EB] px-3 flex'} ><span className='text-[#050505]'>Nhắn tin</span></Link>
                            </div>
                        </>}
                    </div>
                    <ButtonList onClick={changeQuerryParams} searchParams={searchParams} />
                </div>
            </div>
            {!queryString.parse(location.search).sk &&
                <UserPostsTab setPosts={setPosts} isOwner={isOwner} isLoading={isLoading} posts={posts} friends={user.friend} />
            }
            {queryString.parse(location.search).sk == 'about' &&
                <UserAboutTab about={user.about} displayName={user.displayName} birthDay={user.birthDay} sex={user.sex} isOwner={isOwner} />
            }
            {queryString.parse(location.search).sk == 'friends' &&
                <UserFriendTab {...{ friendSet, friendRequestSet, myFriendRequestSet }} friendList={user.friend} isOwner={isOwner} />
            }
        </>
    );
}

export default UserProfile;