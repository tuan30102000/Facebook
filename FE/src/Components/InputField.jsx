import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.func.isRequired,
    isTextarea: PropTypes.bool,
};

function InputField({ name, className = '', errors = {}, label = '', register, placeholder = '', type = 'text', isTextarea = false, textareaSize = '' }) {
    const hasErrors = !!errors[name]
    const classHasError = hasErrors ? 'shadow-red-400' : ''
    return (

        <div className="mb-4">
            <label className={"block text-gray-700 text-sm font-bold mb-2 capitalize" + className} htmlFor={name + '-id'}>
                {label ? label : name}
            </label>
            {!isTextarea && <input {...register(name)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={name + '-id'} type={type} placeholder={placeholder} />}
            {isTextarea && <textarea {...register(name)} className={clsx("shadow appearance-none border resize-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", textareaSize)} id={name + '-id'} type={type} placeholder={placeholder} />}
            {hasErrors && <p className="text-red-600 text-sm">{errors[name]?.message}</p>}
        </div>

    );
}

export default InputField;