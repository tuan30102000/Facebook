import clsx from 'clsx';
import throttle from 'lodash.throttle';
import { stringify } from 'query-string';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import userAuth from '../../Api/userAuthApi';
import useInput from '../../hook/useInput';
import SearchSuggestion from './SearchSuggestion';
function SearchBox() {
    const searchBoxId = 'search-box'
    const navigate = useNavigate()
    const [isLoadingSuggest, setisLoadingSuggest] = useState(true)
    const callBack = (fn, value) => {
        setisLoadingSuggest(true)
        fn()
    }
    const [indexTarget, setindexTarget] = useState(-1)
    var [suggestList, setsuggestList] = useState([])
    const { onChange, value, setvalue } = useInput(callBack)
    const [isShowSuggetion, setisShowSuggetion] = useState(false);
    const closeSuggest = () => { setisShowSuggetion(false) }

    useEffect(() => {
        const onKeyUp = (e) => {
            if (e.keyCode === 38) {
                //up
                setisLoadingSuggest(false)
                setindexTarget(i => i > 0 ? i - 1 : suggestList.length - 1)

            }
            if (e.keyCode === 40) {
                //down
                setisLoadingSuggest(false)
                setindexTarget(i => i < suggestList.length - 1 ? i + 1 : 0)
            }
        }
        document.addEventListener('keyup', onKeyUp)

        return () => {
            document.removeEventListener('keyup', onKeyUp)
        }
    }, [suggestList.length])

    useEffect(() => {
        if (suggestList.length > 0) {
            setvalue(suggestList[indexTarget])
        }

    }, [indexTarget])

    useEffect(() => {
        if (!value) setsuggestList([])


    }, [value, suggestList.length])

    useEffect(() => {
    }, [suggestList])
    const handleSuggets = () => {
        // console.log(value)
        if (value && isLoadingSuggest) {
            console.log(value)
                ; (async () => {
                    const data = await userAuth.searchSuggest(value)
                    const set = new Set([...data])
                    setsuggestList([...set])
                })()
        }

    }
    // var throtleSuggest = useThrotle(handleSuggets, 400)
    var throtleSuggest = throttle(handleSuggets, 400)


    useEffect(throtleSuggest, [value, isLoadingSuggest])
    // useEffect(() => {
    //     document.addEventListener('click', closeSuggest)
    // }, [])

    const onsubmit = (e) => {
        e.preventDefault()
        if (!value) return
        navigate('/search?' + stringify({ q: value }))

    }
    return (
        <form onSubmit={onsubmit} className={clsx('h-full flex items-center bg-white relative p-4 duration-500', { '': !isShowSuggetion, 'translate-x-[-63px] shadow': isShowSuggetion })} >
            {isShowSuggetion && <BiArrowBack onClick={closeSuggest} className='mr-2 text-[25px] animate-show-opacity' />}
            <label htmlFor={searchBoxId} className='bg-[#f0f2f5] h-10 flex w-max items-center rounded-[50px] pr-2 pl-4'>
                <AiOutlineSearch className='text-[20px]' />
                <input autoComplete='off' value={value || ''} onChange={onChange} onFocus={() => setisShowSuggetion(true)}
                    onBlur={closeSuggest} type="text" id={searchBoxId} placeholder='Tìm kiếm' className='bg-transparent outline-none ml-2 font-[300]' />
            </label>
            {isShowSuggetion && <SearchSuggestion {...{ setvalue, suggestList, indexTarget, value }} />}
        </form>
    );
}

export default SearchBox;