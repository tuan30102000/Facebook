import { current } from '@reduxjs/toolkit';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import userAuth from '../../Api/userAuthApi';
import useThrotle from '../../hook/useThrotle';

SearchSuggetion.propTypes = {
    value: PropTypes.string,
    setvalue: PropTypes.func.isRequired,
};
function SearchSuggetion({ value, setvalue }) {
    const [indexTarget, setindexTarget] = useState(1)
    const [suggestList, setsuggestList] = useState([])

    useEffect(() => {
        const handleCurrentChoiceSuggest = (e) => {
            const { keyCode } = e
            if (keyCode == 38) {
                const currentIndex = indexTarget > 0 ? indexTarget - 1 : suggestList.length - 1
                setindexTarget(currentIndex)
                setvalue(setsuggestList[currentIndex])
                console.log(currentIndex)
            }
            if (keyCode == 40) {
                const currentIndex = indexTarget < suggestList.length - 1 ? indexTarget + 1 : 0
                setindexTarget(currentIndex)
                setvalue(setsuggestList[currentIndex])
                console.log(currentIndex)
            }
        }

        document.addEventListener('keyup', handleCurrentChoiceSuggest)
        return () => {
            document.removeEventListener('keyup', handleCurrentChoiceSuggest)
        }
    }, [suggestList.length, indexTarget])
    // useEffect(() => {
    //     setvalue(suggestList[indexTarget] ? suggestList[indexTarget] : '')
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
    const throtleSuggest = useThrotle(handleSuggets, 400)
    useEffect(throtleSuggest, [value])
    useEffect(() => {
        if (!value) setsuggestList([])
    }, [value])

    return (
        <div className='absolute'>
            {suggestList.map((item, index) => <p className={clsx({ 'text-red-400': indexTarget === index })} key={item} >{item}</p>)}
        </div>
    );
}

export default SearchSuggetion;
