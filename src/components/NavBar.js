import React from 'react';
import Auth from './Auth';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
   return (
      <div className={styles.nav}>
         <span className={styles.logo}>{`MemKey`}</span>
         <Auth/>
      </div>
   );
};

export default NavBar;