import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useInput from '../../hook/useInput';


function SearchBox() {
    const searchBoxId = 'search-box'
    const { onChange, value } = useInput()
    return (
        <label htmlFor={searchBoxId} className='bg-[#f0f2f5] h-10 flex w-max items-center rounded-[50px] pr-2 pl-4'>
            <AiOutlineSearch className='text-[20px]' />
            <input value={value} onChange={onChange} type="text" id={searchBoxId} placeholder='Tìm kiếm' className='bg-transparent outline-none ml-2 font-[300]' />
        </label>
    );
}

export default SearchBox;