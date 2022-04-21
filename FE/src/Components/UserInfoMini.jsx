import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

UserInfoMini.propTypes = {
    avartUrl: PropTypes.string,
    displayName: PropTypes.string,
    userId: PropTypes.string.isRequired,
    avtW: PropTypes.string,
    avtH: PropTypes.string,
};
function UserInfoMini({ avartUrl, displayName, userId = '', avtSize = '' }) {
    return (
        <Link to={'/profile/' + userId} className='flex w-max' >
            {avartUrl &&
                <div className={clsx("w-7 h-7 rounded-cr border-[#f3f3f4]", avtSize)}>
                    <img src={avartUrl} className='w-full h-full rounded-crical' alt="" />
                </div>}
            {displayName && <p className='ml-2 text-[#050505] font-bold hover:underline'>{displayName}</p>}
        </Link>
    );
}

export default UserInfoMini;


