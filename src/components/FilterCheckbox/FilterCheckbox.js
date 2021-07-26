import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className='checkbox' htmlFor='checkbox'>
      <input type='checkbox' />
      <div className='checkbox__text'>Короткометражки</div>
    </label>
  );
}

export default FilterCheckbox;
