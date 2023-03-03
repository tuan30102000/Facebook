import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { LoadIcon } from '../../../Components/IconCustom/IconCustom';

ButtonHandleFriend.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    primaryBg: PropTypes.bool,
};

function ButtonHandleFriend({ text, onClick, primaryBg = true, isLoading = false }) {
    return (
        <button disabled={isLoading} onClick={onClick} className={clsx('rounded-[6px] px-3 cursor-pointer h-[40px]',
            {
                ['btn-blue']: primaryBg,
                ['btn-white']: !primaryBg,
            })}>
            {!isLoading && <> {text}</>}
            {isLoading && <LoadIcon isLoading={isLoading} />}
        </button>
    );
}

export default ButtonHandleFriend;