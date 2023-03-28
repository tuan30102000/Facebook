import clsx from 'clsx';
import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';


function Dialog({ Component, componentProps = {}, position = 'top-[calc(100%-6px)] right-3' }, ref) {
    const [isShow, setisShow] = useState(false)
    const openModal = () => setisShow(true)
    const closeModal = () => setisShow(false)
    useImperativeHandle(ref, () => ({
        openModal, closeModal
    }))
    // useEffect(() => {

    //     if (isShow) {
    //         document.addEventListener('click', closeModal)
    //     }

    //     return () => {
    //         document.removeEventListener('click', closeModal)
    //     }
    // }, [isShow])

    return (
        <>
            {
                isShow &&
                <div className={clsx("absolute min-w-[360px] bg-white shadow-[10px_10px_20px_3px_rgba(0,0,0,0.3)] h-max  rounded-lg", position)}>
                    <div onClick={closeModal} className="fixed z-1 top-0 bottom-0 left-0 right-0" ></div>
                    <div className="relative z-20 bg-white">
                        <Component {...componentProps} closeModal={closeModal} />
                    </div>
                </div>
            }
        </>
    );
}

export default forwardRef(Dialog);