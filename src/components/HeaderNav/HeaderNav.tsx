import React from 'react';
// @ts-ignore
import styles from './styles.module.scss';
import classnames from 'classnames';
// @ts-ignore
import userPic from '../../assets/user-logo.jpg';


const menuCategories = ['Analytics','Gradebooks','tests','students','teachers','archive']

function HeaderNav() {
  return (
    <nav className={styles.red}>
      <ul className={styles['header-menu-categories-list']}>

        <li className={classnames(
          styles['header-menu-category'],
          styles['header-menu-category__select-school']
        )}>
          School 1
          <div className={styles['select-icon']}></div>
        </li>


        {menuCategories.map((menuCategory)=>{
          return (
            <li key={menuCategory} className={classnames({
              [styles['header-menu-category']]: true,
              [styles['header-menu-category__active']]: menuCategory==='students'
            })}>
              {menuCategory}
            </li>
          )
        })}


        <li className={classnames(
          styles['user-select'],
        )}>
          <img src={userPic} className={styles['user-select__picture']} alt=""/>
          <div className={styles['select-icon']}></div>
        </li>


      </ul>
    </nav>
  );
}

export default HeaderNav;