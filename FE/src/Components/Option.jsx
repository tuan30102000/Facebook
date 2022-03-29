import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
Option.propTypes = {

};


function Option({ Component, componentProp }) {
    const [isShowOption, setisShowOption] = useState(false)
    const open = () => {
        setisShowOption(true)
    }
    const close = () => {
        setisShowOption(false)
    }

    return (
        <div className='absolute top-0 right-0 w-max h-max'>
            <BsThreeDots onClick={open} className='' />
            <div className="absolute top-full left-[100%] py-2">
                <Component {...componentProp} isShowOption={isShowOption} onClose={close} />
            </div>
        </div>
    );
}

export default Option;