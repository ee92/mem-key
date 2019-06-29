import React from 'react';
import { withStatebase, useStatebase } from '../Test';
import TextField from '@material-ui/core/TextField';

let EmailField = (props) => {
   const ref =  props.statebase.ref('inputs').ref('email');
   const [email, setEmail] = useStatebase(ref);
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