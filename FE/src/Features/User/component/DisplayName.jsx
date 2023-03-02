import React from 'react';
import PropTypes from 'prop-types';

DisplayName.propTypes = {
    displayName: PropTypes.string.isRequired,
};

function DisplayName({ displayName }) {
    return (

        <div className="flex items-center">
            <p className='text-[#1c1e21] text-[32px] font-[700] leading-[32px] capitalize' >{displayName}</p>
        </div>
    );
}

export default DisplayName;