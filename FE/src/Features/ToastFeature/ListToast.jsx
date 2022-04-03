import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from './toastSlice';
import { BsCheckCircle } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { MdReportGmailerrorred } from 'react-icons/md'
import { BiError } from 'react-icons/bi'
import clsx from 'clsx';
ListToast.propTypes = {

};
function Toast({ message, time, type, id }) {
    const dispatch = useDispatch()
    const handleRemoveToast = () => {
        const action = removeToast(id)
        dispatch(action)
    }
    useEffect(() => {

        const timeOutToRemove = setTimeout(handleRemoveToast, time)
        // 
        return () => {
            // 
            clearTimeout(timeOutToRemove)
        }

    }, []);
    return (
        <>
            <div className={clsx('flex bg-white border-l-4 px-4 items-center shadow min-w-400px max-w-450px border-solid py-5 animate-toast-show mt-2 mb-4', {
                'border-l-green-600': type === 'success',
                'border-l-yellow-400': type === 'warning',
                'border-l-red-400': type === 'error',
            })} >
                {type === 'success' && <BsCheckCircle className='text-green-600' />}
                {type === 'warning' && <BiError className='text-yellow-400' />}
                {type === 'error' && <MdReportGmailerrorred className='text-red-400' />}
                <div className="flex-1 px-4">
                    <p className="">
                        {message}
                    </p>
                    <p className="">Chao mung ban den voi facebook</p>
                </div>
                <GrClose onClick={handleRemoveToast} />
            </div>
        </>
    )
}
function ListToast() {
    const toast = useSelector(state => state.toast)
    return (
        <div className='fixed top-4 right-4' >
            {toast.listToast.map((item, index) => <Toast key={item.id} message={item.message} index={index} type={item.type} id={item.id} time={item.time} />)}
        </div>
    );
}

export default ListToast;