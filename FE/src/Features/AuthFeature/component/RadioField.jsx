import React from 'react';
import PropTypes from 'prop-types';

RadioField.propTypes = {
    name: PropTypes.string,
};

function RadioField({ name, value, labelText, register, }) {
    const inputId = name + '-' + value
    return (

        <label className="flex items-center shadow justify-between border rounded w-full py-2 px-3 text-gray-700 leading-tight" htmlFor={inputId}>
            <p>{labelText}</p>
            <input type="radio" {...register(name)} value={value} id={inputId} />
        </label>


    );
}

export default RadioField;