import React from 'react';
// @ts-ignore
import styles from './styles.module.scss'
// @ts-ignore
import searchIcon from '../../assets/search-icon-input.svg'
// @ts-ignore
import exportCsvIcon from '../../assets/button-export-csv-icon.png'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";


function SearchSection() {
  const {searchValueInput} = useTypedSelector((state => state.students));
  const {setSearchInputValue} = useAction()

  return (
    <div className={styles['container']}>
      <h1 className={styles['section-name']}>
        students
      </h1>

      <div className={styles['search-input']}>
        <input
          value={searchValueInput}
          onChange={(e)=>{
            setSearchInputValue(e.target.value)
          }}
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
