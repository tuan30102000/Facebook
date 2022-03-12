import PropTypes from 'prop-types';
import React from 'react';
TextField.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

function TextField({ name, className = '', placeholder = '', register, errors }) {
    const hasErrors = !!errors[name]
    const classHasError = hasErrors ? 'shadow-red-400' : ''
    return (

        <div>
            <div className={"mt-4 items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + classHasError}>
                {/* <label className={"block text-gray-700 text-sm font-bold mb-2 capitalize" + className} htmlFor={name + '-id'}>
            {name}
        </label> */}

                <input {...register(name, { unregister: true })} className="outline-none flex-1" id={name + '-id'} type={'text'} placeholder={placeholder} />
            </div>
            {hasErrors && <p className="text-red-600 text-sm">{errors[name]?.message}</p>}
        </div>
    );
}

export default TextField;