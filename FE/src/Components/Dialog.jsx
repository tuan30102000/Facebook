import clsx from 'clsx';
import React, { forwardRef, useEffect,useState,useImperativeHandle } from 'react';


function Dialog({ Component, componentProps = {}, position = 'top-[calc(100%-6px)] right-3' }, ref) {
    const [isShow, setisShow] = useState(false)
    const openModal = () => setisShow(true)
    const closeModal = () => setisShow(false)
    useImperativeHandle(ref, () => ({
        openModal, closeModal
    }))
    useEffect(() => {

        if (isShow) {
            document.addEventListener('click', closeModal)
        }

        return () => {
            document.removeEventListener('click', closeModal)
        }
    }, [isShow])

    return (
        <>
            {
                isShow &&
                <div className={clsx("absolute min-w-[360px] py-5 bg-white shadow-[10px_10px_20px_3px_rgba(0,0,0,0.3)] h-max rounded-lg", position)}>
                    <Component {...componentProps} closeModal={closeModal} />
                </div>
            }
        </>
    );
}

export default forwardRef(Dialog);