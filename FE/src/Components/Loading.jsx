import React from 'react';
import PropTypes from 'prop-types';
import { LoadIcon } from './IconCustom/IconCustom';

Loading.propTypes = {

};

function Loading({ isLoading = false }) {
    return (
        <>
            {isLoading && <div className='flex items-center bg-white fixed z-40 top-0 bottom-0 left-0 right-0'>
                <LoadIcon isLoading={isLoading} className={'text-[20px]'}/>
            </div>}
        </>
    );
}

export default Loading;