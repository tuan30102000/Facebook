import React, { useRef } from 'react';
import PropTypes from 'prop-types';

EditPostOption.propTypes = {

};

function EditPostOption({ }) {
    const openDeleteModal = useRef({})
    const openEditModal = useRef({})
    return (
        <div>
            <button onClick={openDeleteModal.current.openModal} >delete</button>
            <button onClick={openEditModal.current.openModal} >edit</button>
        </div>
    );
}

export default EditPostOption;