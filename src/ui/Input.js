import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const Adornment = ({attach}) => {
   if (!attach) return null
   return (
      <InputAdornment>
         {attach}
      </InputAdornment>
   )
}

const Input = ({attach, InputProps, children, ...rest}) => (
   <TextField
      InputProps={{
         endAdornment: <Adornment attach={attach}/>,
         ...InputProps
      }}
      {...rest}
   >
      {children}
   </TextField>
)

export default Input;