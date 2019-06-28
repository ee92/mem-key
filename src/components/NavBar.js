import React from 'react';
import AuthButton from './AuthButton';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
   return (
      <div className={styles.nav}>
         <h1>{`(*} MemKey`}</h1>
         <AuthButton />
      </div>
   );
};

export default NavBar;