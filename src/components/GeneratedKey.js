import React from 'react';
import { withStatebase } from 'react-statebase';
import { copy } from '../api/utils.js';

let GeneratedKey = (props) => {
   let generatedKey = props.statebase.ref('generatedKey').val();
   if (!generatedKey) return null;
   return (
      <div>
         <input
            value={generatedKey}
            // type="password"
            readOnly
         />
         <button onClick={() => copy(generatedKey)}>
            copy
         </button>
      </div>
   );
}

export default withStatebase(GeneratedKey);