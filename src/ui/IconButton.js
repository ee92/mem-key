import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import styles from '../styles/Mui.module.css';
 
const _IconButton = ({children, ...rest}) => (
   <IconButton
      classes={{
         root: styles.iconButton
      }}
      {...rest}
   >
      {children}
   </IconButton>
)

export default _IconButton