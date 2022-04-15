import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userAuth from '../../../Api/userAuthApi';

MakeFriendBox.propTypes = {

};

function MakeFriendBox({ friendId, avatarUrl, displayName }) {
    const onClick = async () => {
        const data = await userAuth.addFriend(friendId)
        console.log(data)
    }
    return (
        <div className='flex justify-between' >
            <Link className='flex' to={'/profile/' + friendId} >
                <div className="w-10 h-10">
                    <img src={avatarUrl} className='w-full h-full' alt="" />
                </div>
                <p>{displayName}</p>
            </Link>
            <button onClick={onClick} className=''  >Them ban be</button>
        </div>
    );
}

function MakeFriendList({ listDataUser = [] }) {
    return (
        <div className="">
            {listDataUser.map(item => <MakeFriendBox key={item._id} friendId={item._id} avatarUrl={item.avatarUrl} displayName={item.displayName} />)}
        </div>
    )
}

export default MakeFriendList;