import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import styles from './IconButton.module.css';
 
const _IconButton = ({children, ...rest}) => (
   <IconButton classes={{root: styles.root}} {...rest}>
      {children}
   </IconButton>
)

export default _IconButton