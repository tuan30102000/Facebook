import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

ButtonHandleFriend.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    primaryBg: PropTypes.bool,
};

function ButtonHandleFriend({ text, onClick, primaryBg = true }) {
    return (
        <button onClick={onClick} className={clsx('rounded-[6px] px-3 cursor-pointer min-h-[40px]',
            {
                ['btn-blue']: primaryBg,
                ['btn-white']: !primaryBg,
            })}>
            {text}
        </button>
    );
}

export default ButtonHandleFriend;