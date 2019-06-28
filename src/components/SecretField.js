import React from 'react';
import { withStatebase } from 'react-statebase';
import { visualAid } from '../api/generate.js';
import Input from '../ui/Input.js';
import VisibilityToggle from '../ui/VisibiltyToggle';

let SecretField = (props) => {

   const sb = props.statebase;
   const secretRef = sb.ref('inputs').ref('secret');
   const showRef = sb.ref('visibility').ref('secret');
   const hintRef = sb.ref('visualHint');

   const secret = secretRef.val();
   const show = showRef.val();
   const hint = hintRef.val()

   const toggleShow = () => showRef.set(!show);
   const updateSecret = (e) => {
      const hintValue = visualAid(e.target.value);
      secretRef.set(e.target.value);
      hintRef.set(hintValue);
   }

   return (
      <div style={{display: 'flex', alignItems: 'baseline'}}>
         <Input
            value={secret}
            type={show ? "text" : "password"}
            onChange={updateSecret}
            label="memkey"
            fullWidth
            attach={
               <VisibilityToggle
                  toggle={toggleShow}
                  on={show}
               />
            }
         />
         {hint.map(icon =>
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
         )}
      </div>
   );
};

export default withStatebase(SecretField);