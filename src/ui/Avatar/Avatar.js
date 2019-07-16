import React from 'react';
import styles from './Avatar.module.css';

export const Avatar = ({photo, username}) => {
   if (!photo) {
      if (!username) return null;
      return (
         <span className={styles.avatar}>
            {username.charAt(0)}
         </span>
      );
   }
   return (
      <img
         src={photo}
         className={styles.avatar}
         alt={username}
      />
   );
}