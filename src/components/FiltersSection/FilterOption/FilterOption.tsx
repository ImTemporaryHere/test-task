import React, {FC} from 'react';
// @ts-ignore
import styles from './styles.module.scss'
// @ts-ignore
import selectIcon from '../../../assets/select-icon.svg'

interface filterOptionProps {
  filterName: string
}

const FilterOption: FC<filterOptionProps> = ({filterName}) => {
  return (
    <div className={styles['filter-option']}>
      {filterName}
      <img src={selectIcon} alt="icon" className={styles['filter-option__select-icon']}/>
    </div>
  );
}

export default FilterOption;