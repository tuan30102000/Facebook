import React, { useEffect } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { hiddenSnack } from '../Features/AuthFeature/userSlice';
SnackBar.propTypes = {
    message: PropTypes.string,
};

function SnackBar({ message = 'Xin chao' }) {
    const dispatch = useDispatch()
    const hide = () => {
        const action = hiddenSnack()
        dispatch(action)
    }

    useEffect(() => {
        const timeOutToHide = setTimeout(() => {
            hide()

        }, 3000)
        return () => {
            clearTimeout(timeOutToHide)
        }

    }, [])
    return (
        <>
            <div className='flex border-l-4 px-4 items-center shadow min-w-400px max-w-450px border-solid border-l-green-600 py-5 fixed top-4 right-4 animate-toast-show' >
                <BsCheckCircle className='' />
                <div className="flex-1 px-4">
                    <p className="">
                        {message}
                    </p>
                    <p className="">Chao mung ban den voi facebook</p>
                </div>
                <GrClose onClick={hide} />
            </div>


        </>
    );
}

export default SnackBar;
