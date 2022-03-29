import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ListPost from './ListPost';

ListPostGlobal.propTypes = {

};

function ListPostGlobal() {
    const post = useSelector(state => state.post)
    return (
        <>
            <ListPost listPost={post.globalPost} />
        </>
    );
}

export default ListPostGlobal;