import React from 'react';
import ToggleIcon from 'material-ui-toggle-icon';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { noHover } from '../styles/Mui.module.css';
 
const VisibilityToggle = (props) => (
   <IconButton onClick={props.toggle} className={noHover}>
      <ToggleIcon
         on={props.on}
         onIcon={<Visibility />}
         offIcon={<VisibilityOff />}
      />
   </IconButton>
)

export default VisibilityToggle