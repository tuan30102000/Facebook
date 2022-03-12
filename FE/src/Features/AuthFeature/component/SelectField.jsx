import React from 'react';
import PropTypes from 'prop-types';

SelectField.propTypes = {
    register: PropTypes.func.isRequired,
    listValue: PropTypes.array.isRequired,
};

function SelectField({ listValue, register, name }) {
    return (
        <div className="flex-1">
            <p className='capitalize'>{name}</p>
            <select className='flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"' {...register(name)}>
                {listValue.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;