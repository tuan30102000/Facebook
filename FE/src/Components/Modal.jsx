import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { GrClose } from 'react-icons/gr'
import clsx from 'clsx';
// Modal.propTypes = {
//     Component: PropTypes.func.isRequired,
//     componentProps: PropTypes.object,
// };

function Modal({ Component, componentProps, width = 'w-500', height = '', minWidth = '', maxWidth = '', minHeight = 'min-h-350', maxHeight = '', zIndex = 'z-10' }, ref) {
    const [isShow, setisShow] = useState(false)
    const openModal = () => setisShow(true)
    const closeModal = () => setisShow(false)
    useImperativeHandle(ref, () => ({
        openModal
    }))
    return (
        <>
            {isShow &&
                <>
                    <div className={clsx('fixed flex justify-center items-center w-screen h-screen top-0 left-0', zIndex)}>
                        <div onClick={closeModal} className="absolute z-1 w-full h-full bg-bg-over" ></div>
                        <div className={clsx('relative z-20 rounded-[8px] overflow-hidden shadow pb-5', width, height, minWidth, minHeight, maxHeight, maxWidth)}>
                            <GrClose className='absolute cursor-pointer top-2 right-2 hover:bg-gray-400  rounded-crical' onClick={closeModal} />
                            <Component {...componentProps} />
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default forwardRef(Modal);