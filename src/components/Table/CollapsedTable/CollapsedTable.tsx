// @ts-ignore
import styles from './styles.module.scss'
import React, {FC, ReactNode} from 'react';
import {iStudent} from "../../../types/Student";
import FilterSelect from "./filterSelect/FilterSelect";







const CollapsedTable: FC<iStudent>  = ({name,id}) => {






  return (
    <div className={styles['content-container']}>
      <div className={styles['student-info-heading']}>
        <div className={styles['student-info-heading__data-key']}>
          STUDENT:
        </div>

        <div className={styles['student-info-heading__data-value']}>
          {name}
        </div>


        <div className={styles['student-info-heading__data-key']}>
          id:
        </div>

        <div className={styles['student-info-heading__data-value']}>
          {id}
        </div>
      </div>





      <div className={styles['filters-section']}>


        <div className={styles['filter-select-container']}>
          <FilterSelect inputLabel={'ALL CONCEPTS'} />
        </div>

        <div className={styles['filter-select-container']}>
          <FilterSelect inputLabel={'ALL SCORE'} />
        </div>

        <div className={styles['filter-select-container']}>
          <FilterSelect inputLabel={'ALL SPEED'} />
        </div>



      </div>
















    </div>
  );
}

export default CollapsedTable;