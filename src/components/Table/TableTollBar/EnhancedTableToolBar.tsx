import SearchSection from "../../SearchSection/SearchSection";
import * as React from "react";
// @ts-ignore
import styles from './styles.module.scss';
// @ts-ignore
import clearCross from '../../../assets/clear-cross-white.svg'
// @ts-ignore
import exportCsvIcon from '../../../assets/export-csv-white-icon.svg'
// @ts-ignore
import archiveIcon from '../../../assets/archive-selected-icon.svg'
import classNames from "classnames";

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;


  if(numSelected > 0){

  }

  const studentsQuantity = numSelected > 1 ? 'students' : 'student'


  return (
    <div
      style={{
        minHeight: '54px',
        background: numSelected > 0 ? '#C0C0C0': 'white'
      }}

    >
      {
        numSelected <= 0 ? (
            <SearchSection/>
          )
          :
          (
            <div className={styles['select-options']}>

              <div className={classNames(styles['select-options__white'],styles['select-options__option'])}>
                {numSelected} {studentsQuantity} selected
              </div>


              <div className={classNames(styles['select-options__white'],styles['icon-button'],styles['select-options__option'])}>
                <img src={clearCross} alt="icon" className={styles['icon-button__icon']}/>
                clear all
              </div>


              <div className={classNames(styles['select-options__white'],styles['icon-button'],styles['select-options__option'])}>
                <img src={exportCsvIcon} alt="icon" className={styles['icon-button__icon']}/>
                export CSV
              </div>

              <div className={classNames(styles['icon-button'],styles['select-options__option'],styles['archive-selected'])}>
                <img src={archiveIcon} alt="icon" className={styles['icon-button__icon']}/>
                archive selected
              </div>


            </div>


          )

      }

    </div>
  );
};

export default EnhancedTableToolbar