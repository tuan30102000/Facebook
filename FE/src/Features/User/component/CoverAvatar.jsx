import React from 'react';
import PropTypes from 'prop-types';

CoverAvatar.propTypes = {

};

function CoverAvatar({ coverAvatar }) {
    return (
        <div className="rounded-cover rounded-t-[0px] h-[400px] overflow-hidden">
            <img src={coverAvatar} alt="" className='w-full h-full' />
        </div>
    );
}

export default CoverAvatar;