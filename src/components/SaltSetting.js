import React from 'react';
import { withStatebase, useStatebase } from '../Test';
import Input from '../ui/Input.js';

const SaltSetting = (props) => {
   const settings = props.statebase.ref('settings');
   const useSaltRef = settings.ref('useSalt');
   const saltRef = settings.ref('salt');

   const [useSalt, setUseSalt] = useStatebase(useSaltRef);
   const [salt, setSalt] = useStatebase(saltRef);
   
   return (
      <div>
         <input
            type="checkbox"
            checked={useSalt}
            onChange={(e) => setUseSalt(e.target.checked)}
         />
         use salt:
         {useSalt && (
            <div>
               <Input
                  value={salt} 
                  onChange={(e) => setSalt(e.target.value)}
                  fullWidth
               />
            </div>
         )}
      </div>
   )
}

export default withStatebase(SaltSetting);