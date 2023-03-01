import React from 'react';
import PropTypes from 'prop-types';

CricalImage.propTypes = {
    size: PropTypes.number,
    src: PropTypes.string.isRequired
};

function CricalImage({ size = 40, src }) {
    const sizeImge = size + 'px'
    return (
        <div className='overflow-hidden rounded-crical' style={{ width: size, height: size }}>
            <img src={src} alt="" className='w-full h-full' />
        </div>
    );
}

export default CricalImage;