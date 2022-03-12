import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

UserInfoMini.propTypes = {
    avartUrl: PropTypes.string,
    displayName: PropTypes.string,
    linkTo: PropTypes.string,
    avtW: PropTypes.string,
    avtH: PropTypes.string,
};
function UserInfoMini({ avartUrl, displayName, linkTo = '', avtSize = '' }) {
    return (
        <Link to={linkTo} className='flex w-max' >
            {avartUrl &&
                <div className={clsx("w-7 h-7 rounded-cr", avtSize)}>
                    <img src={avartUrl} className='w-full h-full rounded-crical' alt="" />
                </div>}
            {displayName && <p className='ml-2 font-bold'>{displayName}</p>}
        </Link>
    );
}

export default UserInfoMini;


