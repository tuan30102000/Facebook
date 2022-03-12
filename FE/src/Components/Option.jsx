import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsThreeDots } from 'react-icons/bs';
Option.propTypes = {

};

function Option({ position, listBtn }) {
    const [showOption, setshowOption] = useState(false)
    return (
        <>
            <BsThreeDots className='absolute top-0 right-0' />

        </>
    );
}

export default Option;