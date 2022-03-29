import clsx from 'clsx';
import React from 'react';
import { CloseIcon } from './IconCustom/IconCustom';

CofirmBox.propTypes = {

};

function Btn({ text, bgColor = 'bg-[#dc3545]', onClick = null }) {
    const handleClick = () => onClick && onClick()
    return (
        <button onClick={handleClick} className={clsx('rounded-[3px] py-[10px] w-[120px] text-white opacity-90 hover:opacity-100 text-[16px]', bgColor)}>
            {text}
        </button>
    )
}
{/* <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" color="#7a1b3b" className="w-7 h-7 text-red-500 first:stroke-current" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(122, 27, 59)' }}><path fill="none" stroke="#red" strokeWidth={2} d="M3,3 L21,21 M3,21 L21,3" /></svg> */ }

function CofirmBox({ highlightMessage, message, onConfirm, confirmText = 'Delete', confirmBg = 'bg-[#F15E5E]', closeModal, }) {
    return (
        <div className='w-[400px] h-[380px] bg-white pt-10 rounded-[5px] px-[36px]'>
            <div className="rounded-crical border-solid border-[3px] w-20 h-20 flex justify-center items-center mx-auto border-red-500">
                {/* <GrClose color='#7a1b3b' className='w-7 h-7 text-red-500 first:stroke-current' /> */}
                <CloseIcon className='w-7 h-7 text-red-500' color={''} />
            </div>
            <p className='text-center text-[26px] leading-[39px] mt-[30px]'>{highlightMessage}</p>
            <p className='text-center mt-[30px] text-[16px] text-[#999]'>{message}</p>
            <div className="flex justify-center gap-[10px] mt-[30px]">
                <Btn text={'Cancel'} bgColor='bg-[#c1c1c1]' onClick={closeModal} />
                <Btn text={confirmText} onClick={onConfirm} bgColor={confirmBg} />
            </div>

        </div>
    );
}

export default CofirmBox;