import React from 'react';
import { withStatebase } from 'react-statebase';
import { visualAid } from '../api/generate.js';

import Input from '../ui/Input.js'
import VisibilityToggle from '../ui/VisibiltyToggle';

let SecretField = (props) => {

   const sb = props.statebase;
   const secret = sb.ref('inputs').ref('secret');
   const hint = sb.ref('visualHint');
   const show = sb.ref('visibility').ref('secret')

   const updateSecret = (e) => {
      const hintValue = visualAid(e.target.value);
      secret.set(e.target.value);
      hint.set(hintValue);
   }

   return (
      <div style={{display: 'flex', alignItems: 'baseline'}}>
         <Input
            value={secret.val()}
            type={show.val() ? "text" : "password"}
            onChange={updateSecret}
            label="memkey"
            fullWidth
            attach={
               <VisibilityToggle
                  toggle={() => show.set(!show.val())}
                  on={show.val()}
               />
            }
         />
         {hint.val().map((icon) => (
            <i
               key={icon[0]}
               className={`fas fa-${icon[0]}`}
               style={{
                  color: icon[1],
                  minWidth: 28,
                  textAlign: 'center',
                  fontSize: 20
               }}
            />
         ))}
      </div>
   );
}

export default withStatebase(SecretField);