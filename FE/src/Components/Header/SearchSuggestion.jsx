import clsx from 'clsx';
import PropTypes from 'prop-types';

SearchSuggetion.propTypes = {
    value: PropTypes.string,
    setvalue: PropTypes.func.isRequired,
};
function SearchSuggetion({ suggestList, indexTagret }) {


    return (
        <div className='absolute'>
            {suggestList.map((item, index) => <p key={item} className={clsx({ 'text-red-100': index == indexTagret })} >{item}</p>)
            }
        </div>
    );
}

export default SearchSuggetion;
