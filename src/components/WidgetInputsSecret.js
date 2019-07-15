import React from 'react';
import useGlobal from '../api/store';
import { visualAid } from '../api/generate';
import Input from '../ui/Input';
import VisibilityToggle from '../ui/VisibiltyToggle';

const WidgetInputsSecret = () => {

   const [secret, setSecret] = useGlobal('inputs.secret');
   const [showSecret, setShowSecret] = useGlobal('visibility.secret');
   const [hint, setHint] = useGlobal('visualHint');

   const toggleShow = () => setShowSecret(!showSecret);
   const handleInput = (e) => {
      const hintValue = visualAid(e.target.value);
      setSecret(e.target.value);
      setHint(hintValue);
   }
   
   return (
      <div style={{display: 'flex', alignItems: 'baseline'}}>
         <Input
            value={secret}
            type={showSecret ? "text" : "password"}
            onChange={handleInput}
            label="memkey"
            fullWidth
            attach={
               <VisibilityToggle
                  toggle={toggleShow}
                  on={showSecret}
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

export default WidgetInputsSecret;