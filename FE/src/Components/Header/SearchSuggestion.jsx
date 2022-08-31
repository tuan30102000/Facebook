import clsx from 'clsx';
import PropTypes from 'prop-types';

SearchSuggetion.propTypes = {
    value: PropTypes.string,
    setvalue: PropTypes.func.isRequired,
};
function SearchSuggetion({ suggestList, indexTarget, value }) {
    return (
        <div className='absolute top-full left-0 px-4 shadow bg-white w-full'>
            {!value && <div className="flex">
                <p className='font-[700] h-8 leading-8' >Lịch sử tìm kiếm</p>
            </div>}
            <ul>
                {suggestList.map((item, index) => <p onClick={(e) => e.stopPropagation()} key={item} className={clsx('hover:bg-slate-50 h-10 leading-10 cursor-pointer', { 'text-red-500': index == indexTarget })} >{item}</p>)}
            </ul>
        </div>
    );
}

export default SearchSuggetion;
