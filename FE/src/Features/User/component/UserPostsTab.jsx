import React from 'react';
import PropTypes from 'prop-types';
import ListPost from '../../PostFeature/component/ListPost';
import instance from '../../../Constan/instance';
import { Link } from 'react-router-dom';
import CreatePostLayout from '../../PostFeature/component/createPost/CreatePostLayout';

UserPostsTab.propTypes = {
    posts: PropTypes.array,
    friends: PropTypes.array,
    setPosts:PropTypes.func.isRequired,
};

function FriendsInPostTab({ friends = [] }) {
    // const sliceFriend = friends.slice(0, 9)
    const sliceFriend = [...friends, ...friends, ...friends, ...friends, ...friends, ...friends, ...friends, ...friends, ...friends]
    return (

        <div className='bg-white shadow rounded-[8px] w-fit h-min px-4 pt-5'>
            <div className="">
                <div className="flex justify-between mb-[10px]">
                    <Link to='?sk=friends' className='text-[20px] font-[700]' >Bạn bè</Link>
                    <Link to='?sk=friends' className='text-[17px] text-[#216FDB]' >Xem tất cả bạn bè</Link>
                </div>
                <p className='text-[17px] text-[#65676B]' >{friends.length} bạn bè</p>
            </div>
            {friends.length &&
                <div className="flex flex-wrap justify-between h-max">
                    {sliceFriend.map((item, i) =>
                        <Link key={item._id+i} to={'/profile/' + item._id} className="flex-[0_0_30%]  pb-[30px]">
                            <div className="w-full"> <img src={item.avatarUrl} className='w-full h-full rounded-lg' /></div>
                            <p className='text-[13px] font-[600] text-[#050505] hover:underline leading-4 mt-[6px]'>{item.displayName} </p>
                        </Link>)}
                </div>}
            {!friends.length &&
                <div className=''>
                    Không có người bạn nào để hiển thị
                </div>}
        </div>
    )
}


function UserPostsTab({ posts = [], setPosts, friends }) {
    return (
        <div className='flex justify-center h-max mt-4' >

            <div className="flex basis-[1024px] px-8 justify-between gap-4">
                <FriendsInPostTab friends={friends} />
                <div className="w-max">
                    <CreatePostLayout setPosts={setPosts} />
                    <ListPost listPost={posts} setPostData={setPosts} />
                </div>
            </div>
        </div>
    );
}

export default UserPostsTab;