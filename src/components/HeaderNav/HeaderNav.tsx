import React from 'react';
// @ts-ignore
import styles from './styles.module.scss';
import classnames from 'classnames';


const menuCategories = ['School 1','Analytics','Gradebooks','tests','students','teachers','archive']

function HeaderNav() {
  return (
    <nav className={styles.red}>
      <ul className={styles['header-menu-categories-list']}>

        <li className={classnames(
          styles['header-menu-category'],
          styles['header-menu-category__select']
        )}>
          School 1
          <div className={styles['header-menu-category__select__icon']}></div>
        </li>


        {menuCategories.map((menuCategory)=>{
          return (
            <li key={menuCategory} className={styles['header-menu-category']}>
              {menuCategory}
            </li>
          )
        })}


      </ul>
    </nav>
  );
}

export default HeaderNav;