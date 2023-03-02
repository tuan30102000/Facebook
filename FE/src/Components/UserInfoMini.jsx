import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

UserInfoMini.propTypes = {
    avartUrl: PropTypes.string,
    displayName: PropTypes.string,
    userId: PropTypes.string,
};
function UserInfoMini({ avatarUrl, displayName, userId = '', avtSize = '', nameStyle = {}, isMargin = true }) {
    return (
        <Link to={'/profile/' + userId} className='flex w-max' >
            {avatarUrl &&
                <div className={clsx("w-7 h-7 rounded-cr border-[#f3f3f4]", avtSize)}>
                    <img src={avatarUrl} className='w-full h-full rounded-crical' alt="" />
                </div>}
            {displayName && <p className={clsx('text-[#050505] font-bold capitalize hover:underline', nameStyle, { 'ml-2': isMargin })}>{displayName}</p>}
        </Link>
    );
}

export default UserInfoMini;


