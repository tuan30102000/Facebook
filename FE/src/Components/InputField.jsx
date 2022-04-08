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

function InputField({ name, className = '', register, placeholder = '', type = 'text', isTextarea = false, textareaSize = '' }) {
    return (

        <div className="mb-4">
            <label className={"block text-gray-700 text-sm font-bold mb-2 capitalize" + className} htmlFor={name + '-id'}>
                {name}
            </label>
            {!isTextarea && <input {...register(name)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={name + '-id'} type={type} placeholder={placeholder} />}
            {isTextarea && <textarea {...register(name)} className={clsx("shadow appearance-none border resize-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", textareaSize)} id={name + '-id'} type={type} placeholder={placeholder} />}
        </div>

    );
}

export default InputField;