import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const Input = (props) => {
   return (
      <TextField
         value={props.value}
         onChange={props.onChange}
         label={props.label}
         fullWidth={props.fullWidth}
         readOnly={props.readOnly}
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  {props.attach}
               </InputAdornment>
            )
         }}
      />
   );
}

export default Input;