import React, { useEffect } from 'react';
import { LoadIcon } from './IconCustom/IconCustom';
function ButtonOption({ text = '', isLoading = false, onClick = () => undefined }) {
    return (
        <button onClick={onClick} disabled={isLoading} className="py-1 px-2 w-full text-left hover:bg-[#0000000d]">
            {!isLoading && <>{text}</>}
            {isLoading && <LoadIcon isLoading={isLoading} />}
        </button>
    )
}

{/* <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" color="#7a1b3b" className="w-7 h-7 text-red-500 first:stroke-current" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(122, 27, 59)' }}><path fill="none" stroke="#red" strokeWidth={2} d="M3,3 L21,21 M3,21 L21,3" /></svg> */ }
function OptionBtn({ onClose, btnData = [], isShowOption }) {
    useEffect(() => {
        // 
        const windowClick = () => onClose && onClose()

        if (isShowOption) {
            window.addEventListener('click', windowClick)
        }

        return () => {
            // 
            if (isShowOption) {
                window.removeEventListener('click', windowClick)
            }
        }
    }, [isShowOption]);
    return (
        <>
            {isShowOption &&
                <div className='bg-white rounded-[4px] w-[200px] shadow py-2' >
                    {btnData.map((item, i) => <ButtonOption {...item} key={i} />)}
                </div>}
        </>
    );
}

export default OptionBtn