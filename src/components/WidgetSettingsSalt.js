import React from 'react';
import { withStatebase, useStatebase } from 'react-statebase';
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

const WidgetSettingsSalt = (props) => {
   const settings = props.statebase.ref('settings');
   const useSaltRef = settings.ref('useSalt');
   const saltRef = settings.ref('salt');

   const [useSalt, setUseSalt] = useStatebase(useSaltRef);
   const [salt, setSalt] = useStatebase(saltRef);

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

export default withStatebase(WidgetSettingsSalt);