import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useInput from '../../hook/useInput';
import SearchSuggestion from './SearchSuggestion';


function SearchBox() {
    const searchBoxId = 'search-box'
    const { onChange, value, setvalue } = useInput()
    const [isShowSuggetion, setisShowSuggetion] = useState(false);

    const onsubmit = (e) => {
        e.preventDefault()
        console.log(value)
    }

    return (
        <form onSubmit={onsubmit} className='relative' >
            <label htmlFor={searchBoxId} className='bg-[#f0f2f5] h-10 flex w-max items-center rounded-[50px] pr-2 pl-4'>
                <AiOutlineSearch className='text-[20px]' />
                <input autoComplete='off' value={value} onChange={onChange} onFocus={() => setisShowSuggetion(true)}
                    onBlur={() => {
                        console.log('blur')
                        setisShowSuggetion(false)
                    }} type="text" id={searchBoxId} placeholder='Tìm kiếm' className='bg-transparent outline-none ml-2 font-[300]' />
            </label>
            {isShowSuggetion && <SearchSuggestion {...{ value, setvalue }} />}
        </form>
    );
}

export default SearchBox;