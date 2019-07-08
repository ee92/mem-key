import React from 'react';
import AuthButton from './AuthButton';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
   return (
      <div className={styles.nav}>
         <span className={styles.logo}>{`MemKey`}</span>
         <AuthButton />
      </div>
   );
};

export default NavBar;