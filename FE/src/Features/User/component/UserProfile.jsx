import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import postApi from '../../../Api/postApi';
import FriendListMini from '../../../Components/FriendListMini';
import ListPost from '../../PostFeature/component/ListPost';
import Avatar from './Avatar';
import ButtonList from './ButtonList';
import CoverAvatar from './CoverAvatar';
import DisplayName from './DisplayName';
import UserPostsTab from './UserPostsTab';

UserProfile.propTypes = {
    isOwner: PropTypes.bool,
    user: PropTypes.object.isRequired,
};

function UserProfile({ isOwner = false, user }) {
    const location = useLocation()
    const navigate = useNavigate()
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
            const postUsers = await postApi.getPostUser(user._id)
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
                    <CoverAvatar coverAvatar={user.coverAvatar} />
                    <div className="relative flex mx-10  pt-8 pb-8  border-solid border-b border-[#ccced2]">
                        <Avatar isOwner={isOwner} avatarUrl={user.avatarUrl} />
                        <div className="self-center ml-[180px]">
                            <DisplayName displayName={user.displayName} />
                            <Link className='text-[#65676B] font-[600] pt-[10px] hover:underline' to='?sk=friends'>{user.friend.length} Bạn bè</Link>
                            <FriendListMini friendList={user.friend} />
                            {/* <Link to={'/profile/62581c15de652906e05650ed?sk='} >aa</Link> */}
                        </div>
                    </div>
                    <ButtonList onClick={changeQuerryParams} searchParams={searchParams} />
                </div>
            </div>
            <UserPostsTab setPosts={setPosts} posts={posts} friends={user.friend} />
        </>
    );
}

export default UserProfile;