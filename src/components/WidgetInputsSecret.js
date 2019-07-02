import React from 'react';
import { withStatebase, useStatebase } from 'react-statebase';
import { visualAid } from '../api/generate.js';
import Input from '../ui/Input.js';
import VisibilityToggle from '../ui/VisibiltyToggle';

const WidgetInputsSecret = (props) => {
   const sb = props.statebase;
   const secretRef = sb.ref('inputs').ref('secret');
   const showRef = sb.ref('visibility').ref('secret');
   const hintRef = sb.ref('visualHint');

   const [secret, setSecret] = useStatebase(secretRef);
   const [show, setShow] = useStatebase(showRef);
   const [hint, setHint] = useStatebase(hintRef);

   const toggleShow = () => setShow(!show);
   const handleInput = (e) => {
      const hintValue = visualAid(e.target.value);
      setSecret(e.target.value);
      setHint(hintValue);
   }
   
   return (
      <div style={{display: 'flex', alignItems: 'baseline'}}>
         <Input
            value={secret}
            type={show ? "text" : "password"}
            onChange={handleInput}
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

export default withStatebase(WidgetInputsSecret);