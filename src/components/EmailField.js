import React from 'react';
import { withStatebase } from 'react-statebase';
import TextField from '@material-ui/core/TextField';

let EmailField = (props) => {
   let email =  props.statebase.ref('inputs').ref('email');
   return (
      <TextField
         value={email.val()}
         onChange={(e) => email.set(e.target.value)}
         label="username/email"
         fullWidth
      />
   );
}

export default withStatebase(EmailField);