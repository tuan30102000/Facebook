import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import NotifyItem from './NotifyItem';
import usePagination from '../../../hook/usePagination';
import { loadMoreNotify } from '../notifySlice';

NotifycationBox.propTypes = {

};

function NotifycationBox() {
    const notify = useSelector(state => state.notify)
    const { notifies } = notify
    const dispatch = useDispatch()

    const loadMore = () => {
        dispatch(loadMoreNotify())
    }
    const { observer } = usePagination(loadMore)
    return (
        <div className="px-2 py-5">
            <div className=' max-h-[400px] overflow-y-auto '>
                {
                    notifies.map((item, index) => <NotifyItem key={item._id} hasObserver={index == notifies.length - 1} {...item} observer={observer} />)
                }
            </div>
            {!notifies[0] && <p className='text-center'>Không có thông báo</p>}
            
        </div>
    );
}

export default NotifycationBox;