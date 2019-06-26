import React from 'react';
import { withStatebase } from 'react-statebase';

let EmailField = (props) => {
   let email =  props.statebase.ref('inputs').ref('email');
   return (
      <div>
         <input
            value={email.val()}
            onChange={(e) => email.set(e.target.value)}
            placeholder="username/email"
         />
      </div>
   );
}

export default withStatebase(EmailField);