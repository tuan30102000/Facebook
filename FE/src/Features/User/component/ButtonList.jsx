import React from 'react';
import PropTypes from 'prop-types';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

ButtonList.propTypes = {

};
function activeNavLink(query, currentQuerry) {
    if (!currentQuerry && query === '') return true
    if (query == currentQuerry) return true
    return false
}

const data = [{ title: 'Bài viết', search: '', }, { title: 'Giới thiệu', search: 'about', }, { title: 'Friends', search: 'friends', }]
function ButtonList({ searchParams }) {
    const navigate = useNavigate()
    const onClick = (params) => {

        params
            ? navigate({
                search: `?${createSearchParams({ sk: params })}`,
            })
            : navigate({})
    }
    return (
        <div className='flex mx-8'>
            {data.map(item => <div
                className={clsx('h-[60px] font-[600] flex items-center text-[#65676B] text-[15px] px-4 cursor-pointer relative', { 'text-[#1876f2] after:block after:absolute after:bottom-0 after:w-full after:left-0 after:h-1 after:bg-[#1876f2]': activeNavLink(item.search, searchParams.sk) })}
                onClick={() => onClick(item.search)}
                key={item.title}>{item.title}</div>)}
        </div>
    );
}

export default ButtonList;