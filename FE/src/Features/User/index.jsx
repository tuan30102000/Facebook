import React from 'react';
import PropTypes from 'prop-types';

UserControl.propTypes = {

};

function UserControl({ Outlet }) {
    return (
        <div className='flex justify-center' >
            <div className="basis-[1024px]">
                <Outlet />
            </div>
        </div>
    );
}

export default UserControl;