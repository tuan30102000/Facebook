import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useInput from '../../hook/useInput';
import SearchSuggestion from './SearchSuggestion';
import userAuth from '../../Api/userAuthApi';
import useThrotle from '../../hook/useThrotle';


function SearchBox() {
    const searchBoxId = 'search-box'
    const callBack = (fn, value) => {
        throtleSuggest()
        fn()
    }
    const [indexTarget, setindexTarget] = useState(0)
    const [suggestList, setsuggestList] = useState([''])
    const { onChange, value, setvalue } = useInput(callBack)
    const [isShowSuggetion, setisShowSuggetion] = useState(false);

    useEffect(() => {
        const onKeyUp = (e) => {
            if (e.keyCode === 38) {
                //up
                setindexTarget(i => i > 0 ? i - 1 : suggestList.length - 1)

            }
            if (e.keyCode === 40) {
                //down
                setindexTarget(i => i < suggestList.length - 1 ? i + 1 : 0)

            }
        }
        document.addEventListener('keyup', onKeyUp)

        return () => {
            document.removeEventListener('keyup', onKeyUp)
        }
    }, [suggestList.length])

    // useEffect(() => {
    //     console.log(value)
    //     setvalue(suggestList[indexTarget])

    // }, [indexTarget, suggestList])


    const handleSuggets = () => {
        // console.log(value)
        if (value) {
            ; (async () => {
                const data = await userAuth.searchSuggest(value)
                const set = new Set([value, ...data])
                setsuggestList([...set])
            })()
        }
        if (!value) {
            setsuggestList([])
        }
    }
    var throtleSuggest = useThrotle(handleSuggets, 400)



    const onsubmit = (e) => {
        e.preventDefault()
        console.log(value)
    }


    return (
        <form onSubmit={onsubmit} className='relative' >
            <label htmlFor={searchBoxId} className='bg-[#f0f2f5] h-10 flex w-max items-center rounded-[50px] pr-2 pl-4'>
                <AiOutlineSearch className='text-[20px]' />
                <input autoComplete='off' value={value || ''} onChange={onChange} onFocus={() => setisShowSuggetion(true)}
                    onBlur={() => { setisShowSuggetion(false) }} type="text" id={searchBoxId} placeholder='Tìm kiếm' className='bg-transparent outline-none ml-2 font-[300]' />
            </label>
            {isShowSuggetion && <SearchSuggestion {...{ value, setvalue, suggestList, indexTarget }} />}
        </form>
    );
}

export default SearchBox;