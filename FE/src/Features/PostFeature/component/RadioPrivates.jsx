import React from 'react';
import PropTypes from 'prop-types';
import instance from '../../../Constan/instance';

RadioPrivates.propTypes = {

};

function RadioField({ name = 'privateType', value, labelText, onChange, }) {
    const inputId = name + '-' + labelText
    return (

        <label className="flex flex-col items-center rounded w-full py-2 px-3 text-gray-700 leading-tight" htmlFor={inputId}>
            <p className='capitalize'>{labelText}</p>
            <input checked={value === labelText} type="radio" onChange={onChange} name={name} value={labelText} id={inputId} />
        </label>


    );
}

function RadioPrivates({ privateType, handlePrivateChange }) {
    return (
        <div className='flex' >
            {instance.typePrivate.map(item => <RadioField key={item} value={privateType} labelText={item} onChange={handlePrivateChange} />)}
        </div>
    );
}

export default RadioPrivates;