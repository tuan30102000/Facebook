import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
PasswordField.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
};

function PasswordField({ name, className = '', placeholder = '', register, errors }) {
    const [typeInput, settypeInput] = useState(true)
    const hasErrors = !!errors[name]
    const classHasError = hasErrors ? 'shadow-red-400' : ''
    return (

        <>
            <div className={"flex mt-4 items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + classHasError}>
                {/* <label className={"block text-gray-700 text-sm font-bold mb-2 capitalize" + className} htmlFor={name + '-id'}>
                {name}
            </label> */}
                <input {...register(name, { unregister: true })} className="outline-none flex-1" id={name + '-id'} type={typeInput ? 'password' : 'text'} placeholder={placeholder} />
                {typeInput && <AiOutlineEye onClick={() => { settypeInput(false) }} />}
                {!typeInput && <AiOutlineEyeInvisible onClick={() => { settypeInput(true) }} />}
            </div>
            {hasErrors && <p className="text-red-600 text-sm">{errors[name]?.message}</p>}

        </>
    );
}

export default PasswordField;