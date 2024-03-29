import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { GrClose } from 'react-icons/gr'
import clsx from 'clsx';
// Modal.propTypes = {
//     Component: PropTypes.func.isRequired,
//     componentProps: PropTypes.object,
// };

function Modal({ Component, componentProps, zIndex = 'z-[51]', isHaveCloseBtn = true }, ref) {
    const [isShow, setisShow] = useState(false)
    const openModal = () => setisShow(true)
    const closeModal = () => setisShow(false)
    useImperativeHandle(ref, () => ({
        openModal, closeModal
    }))
    return (
        <>
            {isShow &&
                <>
                    <div className={clsx('fixed flex justify-center items-center w-full h-screen top-0 left-0', zIndex)}>
                        <div onClick={closeModal} className="absolute z-1 w-full h-full bg-black opacity-50" ></div>
                        <div className={clsx('relative z-20 rounded-[8px] overflow-hidden pb-5 w-max h-max',)}>
                            {isHaveCloseBtn && <GrClose className='absolute z-20 cursor-pointer top-2 right-2 hover:bg-gray-400  rounded-crical' onClick={closeModal} />}
                            <Component {...componentProps} closeModal={closeModal} />
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default forwardRef(Modal);