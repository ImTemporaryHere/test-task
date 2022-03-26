import React from 'react';
import FilterOption from "./FilterOption/FilterOption";
// @ts-ignore
import styles from './styles.module.scss'
// @ts-ignore
import crossIcon from "../../assets/cross-icon.png";

const filters = ['show all', 'all grades', 'all classes', 'av.score', 'av.speed']

function FiltersSection() {
  return (
    <ul className={styles['filters-container']}>
      {filters.map((filterName)=>{
        return (
          <li key={filterName} className={styles['filter-item']}>
            <FilterOption filterName={filterName} />
          </li>
        )
      })}

      <li className={styles['filter-item']}>
        <div className={styles['clear-filters']}>
          <img src={crossIcon} alt="icon" className={styles['clear-filters__cross-icon']}/>
          clear all
        </div>
      </li>

    </ul>
  );
}

export default FiltersSection;