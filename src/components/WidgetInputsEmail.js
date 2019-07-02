import React from 'react';
import { withStatebase, useStatebase } from 'react-statebase';
import TextField from '@material-ui/core/TextField';

const WidgetInputsEmail = (props) => {
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

export default withStatebase(WidgetInputsEmail);