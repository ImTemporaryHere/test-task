import React, {ChangeEvent, useCallback} from 'react';
// @ts-ignore
import styles from './styles.module.scss'
// @ts-ignore
import searchIcon from '../../assets/search-icon-input.svg'
// @ts-ignore
import exportCsvIcon from '../../assets/button-export-csv-icon.png'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {debounce} from "ts-debounce";

function SearchSection() {
  const {searchValueInput, currentPage, rowsPerPage, sortDir , sortBy} = useTypedSelector((state => state.students));
  const {setSearchInputValue,fetchStudents} = useAction()


  const debouncedFetchStudents = useCallback(debounce(fetchStudents, 500),[])

  const handleSearchInputChange = (e:ChangeEvent)=>{
    const inputValue = (e.target as HTMLInputElement ).value

    setSearchInputValue(inputValue)
    debouncedFetchStudents(currentPage, rowsPerPage, sortBy, sortDir, inputValue )
  }


  return (
    <div className={styles['container']}>
      <h1 className={styles['section-name']}>
        students
      </h1>

      <div className={styles['search-input']}>
        <input
          value={searchValueInput}
          onChange={handleSearchInputChange}
          placeholder={'Enter Student Name, Parent or ID here'}
          className={styles['search-input__input']}
          type="text"/>
        <img src={searchIcon} alt=""/>
      </div>


      <button className={styles['export-csv-button']}>
        <img src={exportCsvIcon} alt="icon"/>
        export csv
      </button>

    </div>
  );
}

export default SearchSection;
