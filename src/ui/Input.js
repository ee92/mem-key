import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import styles from '../styles/Mui.module.css'

const Adornment = ({attach}) => {
   if (!attach) return null
   return (
      <InputAdornment>
         {attach}
      </InputAdornment>
   )
}

const Input = ({attach, children, InputProps, InputLabelProps, ...rest}) => (
   <TextField
      InputProps={{
         ...InputProps,
         classes: {
            underline: styles.underline
         },
         endAdornment: attach && <Adornment attach={attach}/>,
      }}
      InputLabelProps={{
         ...InputLabelProps,
         classes: {
            root: styles.label,
            focused: styles.focused,
            animated: styles.animated
         }
      }}
      {...rest}
   >
      {children}
   </TextField>
)

export default Input;