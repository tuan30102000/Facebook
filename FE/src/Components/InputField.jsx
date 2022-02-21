import React from 'react';
import PropTypes from 'prop-types';

inputField.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.func.isRequired,
};

function inputField({ name, className = '', placeholder = '', type = 'text',register }) {
    return (

        <div className="mb-4">
            <label className={"block text-gray-700 text-sm font-bold mb-2 capitalize" + className} htmlFor={name + '-id'}>
                {name}
            </label>
            <input {...register(name)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={name + '-id'} type={type} placeholder={placeholder} />
        </div>

    );
}

export default inputField;