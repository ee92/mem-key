import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import styles from './IconButton.module.css';

const ignoreFocus = (e) => e.preventDefault()
 
const _IconButton = ({children, ...rest}) => (
   <IconButton
      onMouseDown={ignoreFocus}
      classes={{root: styles.root}}
      {...rest} 
   >
      {children}
   </IconButton>
)

export default _IconButton