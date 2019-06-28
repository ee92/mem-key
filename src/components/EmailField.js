import React from 'react';
import { withStatebase } from 'react-statebase';
import TextField from '@material-ui/core/TextField';

let EmailField = (props) => {
   const ref =  props.statebase.ref('inputs').ref('email');
   const email = ref.val();
   const setEmail = (value) => ref.set(value);
   return (
      <TextField
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         label="username/email"
         fullWidth
      />
   );
};

export default withStatebase(EmailField);