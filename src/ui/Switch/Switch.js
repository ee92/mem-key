import React from 'react';
import Switch from '@material-ui/core/Switch';
import styles from './Switch.module.css';

const _Switch = (props) => {
   return (
      <Switch
         color="primary"
         classes={{
            root: styles.root,
            colorPrimary: styles.colorPrimary,
         }}
         {...props}
      />
   )
}

export default _Switch;