import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { stringify } from 'query-string'
import { LoadIcon } from '../IconCustom/IconCustom';
SearchSuggetion.propTypes = {
    value: PropTypes.string,
    setvalue: PropTypes.func.isRequired,
};
function SearchSuggetion({ suggestList, indexTarget, value, isLoading=false }) {
    const navigate = useNavigate()
    return (
        <div className='absolute top-full left-0 px-4 shadow bg-white w-full'>
            {/* {!value && <div className="flex">
                <p className='font-[700] h-8 leading-8' >Lịch sử tìm kiếm</p>
            </div>} */}
            <ul>
                <LoadIcon isLoading={isLoading} />
                {suggestList.map((item, index) => <p
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                        navigate('/search?' + stringify({ q: item }), { replace: true })
                    }} key={item}
                    className={clsx('hover:bg-slate-50 h-10 leading-10 cursor-pointer block', { 'text-red-500': index == indexTarget })} >{item}</p>)}
            </ul>
        </div>
    );
}

export default SearchSuggetion;
