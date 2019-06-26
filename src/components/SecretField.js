import React from 'react';
import { withStatebase } from 'react-statebase';
import { visualAid } from '../api/generate.js';

let SecretField = (props) => {
   let secret = props.statebase.ref('inputs').ref('secret');
   let hint = props.statebase.ref('visualHint');
   const updateSecret = (e) => {
      let hintValue = visualAid(e.target.value)
      secret.set(e.target.value)
      hint.set(hintValue)
   }
   return (
      <div>
         <input
            value={secret.val()}
            onChange={updateSecret}
            placeholder="memkey"
         />
         {hint.val().map((icon) => (
            <i
               key={icon[0]}
               className={`fas fa-${icon[0]}`}
               style={{
                  color: icon[1],
                  minWidth: 20,
                  textAlign: 'center'
               }}
            />
         ))}
      </div>
   );
}

export default withStatebase(SecretField);