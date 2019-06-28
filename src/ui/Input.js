import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const Input = ({attach, ...rest}) => {
   return (
      <TextField
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  {attach}
               </InputAdornment>
            ),
            ...rest.InputProps
         }}
         {...rest}
      />
   );
}

export default Input;