import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import CoverAvatar from './CoverAvatar';
import Avatar from './Avatar';
import FriendListMini from '../../../Components/FriendListMini';
import DisplayName from './DisplayName';
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import ButtonList from './ButtonList';

UserProfile.propTypes = {
    isOwner: PropTypes.bool,
    user: PropTypes.object.isRequired,
};

function UserProfile({ isOwner = false, user }) {
    const location = useLocation()
    const navigate = useNavigate()
    // navigate({ search: `?${createSearchParams({ sk: 'friend' })}` })
    const searchParams = useMemo(() => {
        const seach = queryString.parse(location.search)
        console.log(seach)
        const param = {
            ...seach,
        }
        return param
    }, [location.search])
    return (
        <div className='flex justify-center bg-white shadow'>
            <div className="basis-[1024px]">
                <CoverAvatar coverAvatar={user.coverAvatar} />
                <div className="relative flex mx-10  pt-8 pb-8  border-solid border-b border-[#ccced2]">
                    <Avatar isOwner={isOwner} avatarUrl={user.avatarUrl} />
                    <div className="self-center ml-[180px]">
                        <DisplayName displayName={user.displayName} />
                        <p className='text-[#65676B] font-[600] pt-[10px] '>{user.friend.length} Bạn bè</p>
                        <FriendListMini friendList={user.friend} />
                        {/* <Link to={'/profile/62581c15de652906e05650ed?sk='} >aa</Link> */}
                    </div>
                </div>
                <ButtonList searchParams={searchParams} />
            </div>
        </div>
    );
}

export default UserProfile;