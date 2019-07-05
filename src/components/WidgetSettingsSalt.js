import React from 'react';
import useGlobal from '../api/store';
import { randomWord } from '../api/generate.js';
import Input from '../ui/Input.js';

import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Sync from '@material-ui/icons/Sync';

import { noHover } from '../styles/Mui.module.css';

const SaltField = (props) => (
   <Input
      value={props.salt} 
      fullWidth
      readOnly
      attach={
         <IconButton className={noHover} onClick={props.createSalt}>
            <Sync/>
         </IconButton>
      }
   />
)

const WidgetSettingsSalt = () => {

   const [useSalt, setUseSalt] = useGlobal('settings.useSalt');
   const [salt, setSalt] = useGlobal('settings.salt');

   const createSalt = () => {
      const word = randomWord()
      setSalt(word)
   }

   const toggleSalt = (e) => {
      const checked = e.target.checked
      setUseSalt(checked)
      if (!salt) {
         createSalt()
      }
   }

   return (
      <div>
         <Switch
            checked={useSalt}
            onChange={toggleSalt}
            color="primary"
         />
         <label>Use salt</label>
         {useSalt && <SaltField
            salt={salt}
            createSalt={createSalt}
         />}
      </div>
   )
}

export default WidgetSettingsSalt;