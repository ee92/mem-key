import React from 'react';
import useGlobal from '../api/store';
import Input from '../ui/Input.js';

const WidgetInputsEmail = () => {
   const [email, setEmail] = useGlobal('inputs.email');
   return (
      <Input
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         label="username/email"
         fullWidth
      />
   );
};

export default WidgetInputsEmail;