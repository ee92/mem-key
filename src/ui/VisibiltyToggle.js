import React from 'react';
import ToggleIcon from 'material-ui-toggle-icon';
import IconButton from './IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
 
const VisibilityToggle = (props) => (
   <IconButton onClick={props.toggle}>
      <ToggleIcon
         on={props.on}
         onIcon={<Visibility />}
         offIcon={<VisibilityOff />}
      />
   </IconButton>
)

export default VisibilityToggle