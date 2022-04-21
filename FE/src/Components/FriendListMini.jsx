import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

FriendListMini.propTypes = {

};

function FriendListMini({ friendList = [] }) {
    const nineFriendFirst = friendList.slice(0, 9)
    const [indexShowName, setindexShowName] = useState(0)
    const onHover = (i) => {
        setindexShowName(i)
    }
    const onMouseleave = () => {
        setindexShowName(-1)
    }
    return (
        <div className='flex mt-3'>
            {nineFriendFirst.map((item, i) => (
                <Link onMouseOver={()=>onHover(i)} onMouseLeave={onMouseleave} to={'/profile/' + item._id} key={i} className={clsx('w-8 h-8 rounded-crical relative cursor-pointer border border-solid')} style={{ left: `${-7 * i}px`, zIndex: i }}>
                    <img  src={item.avatarUrl} className='object-cover rounded-crical' />
                    {indexShowName == i && <p className='absolute top-full text-sm w-max px-2 font-bold right-[50%] translate-x-[50%] py-2 shadow bg-white rounded-[8px]'>{item.displayName}</p>}
                </Link>
            ))
            }
        </div>
    );
}

export default FriendListMini;  