import React from 'react';
import useGlobal from '../../api/store';
import { randomWord } from '../../api/generate';
import Input from '../../ui/Input';
import Switch from '../../ui/Switch';
import IconButton from '../../ui/IconButton';
import Sync from '@material-ui/icons/Sync';
import styles from './WidgetSettingsSalt.module.css';

const SaltField = (props) => (
   <Input
      value={props.salt}
      fullWidth
      readOnly
      attach={
         <IconButton onClick={props.createSalt}>
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
      <div className={styles.root}>
         <Switch
            checked={useSalt}
            onChange={toggleSalt}
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