import React from 'react';
import useGlobal from '../api/store';
import TextField from '@material-ui/core/TextField';

const WidgetInputsEmail = () => {
   const [email, setEmail] = useGlobal('inputs.email');
   return (
      <TextField
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         label="username/email"
         fullWidth
      />
   );
};

export default WidgetInputsEmail;