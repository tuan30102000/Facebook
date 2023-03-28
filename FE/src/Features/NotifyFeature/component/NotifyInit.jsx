import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import notifyApi from '../../../Api/notifyApi';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotify } from '../notifySlice';

NotifyInit.propTypes = {

};

function NotifyInit(props) {
    const dispatch = useDispatch()
    const notify = useSelector(state => state.notify)
    useEffect(() => {
        if (!notify.isLoadNotify) return
        dispatch(loadNotify())
        return () => {
        }
    }, [notify.isLoadNotify])

    return (
        <>

        </>
    );
}

export default NotifyInit;