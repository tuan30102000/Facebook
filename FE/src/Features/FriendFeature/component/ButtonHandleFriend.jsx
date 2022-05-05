import React from 'react';
import PropTypes from 'prop-types';

ButtonHandleFriend.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

function ButtonHandleFriend({ text, onClick }) {
    return (
        <button onClick={onClick} className='rounded-[6px] px-3 cursor-pointer bg-[#E4E6EB]  hover:bg-[#F0F2F5]'>
            {text}
        </button>
    );
}

export default ButtonHandleFriend;