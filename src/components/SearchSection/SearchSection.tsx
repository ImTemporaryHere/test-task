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
import {headCells} from "../Table/TableHead/TableHead";
// @ts-ignore
import { convertArrayToCSV } from 'convert-array-to-csv'

function SearchSection() {
  const {searchValueInput, currentPage, rowsPerPage, sortDir , sortBy,students} = useTypedSelector((state => state.students));
  const {setSearchInputValue,fetchStudents} = useAction()


  const debouncedFetchStudents = useCallback(debounce(fetchStudents, 500),[])

  const handleSearchInputChange = (e:ChangeEvent)=>{
    const inputValue = (e.target as HTMLInputElement ).value

    setSearchInputValue(inputValue)
    debouncedFetchStudents(currentPage, rowsPerPage, sortBy, sortDir, inputValue )
  }

  const handleExportToCSV = ()=>{
    const csv = convertArrayToCSV(students.map((student)=>{
      const studentCopy = JSON.parse(JSON.stringify(student));
      delete studentCopy.tests
      studentCopy.parents = studentCopy.parents.join(' , ')
      return studentCopy

    }), {
      header: headCells.map((cell)=>cell.slug),
    });


    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", 'mydata.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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


      <button onClick={handleExportToCSV} className={styles['export-csv-button']}>
        <img src={exportCsvIcon} alt="icon"/>
        export csv
      </button>

    </div>
  );
}

export default SearchSection;
