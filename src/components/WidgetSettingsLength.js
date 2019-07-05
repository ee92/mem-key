import React from 'react';
import useGlobal from '../api/store';
import { noHover } from '../styles/Mui.module.css';

import Input from '../ui/Input';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const Increment = props => (
   <Input
      value={props.value}
      readOnly
      fullWidth
      attach={
         <React.Fragment>
            <IconButton className={noHover} onClick={props.incUp}>
               <ExpandLess/>
            </IconButton>
            <IconButton className={noHover} onClick={props.incDown}>
               <ExpandMore/>
            </IconButton>
         </React.Fragment>
      }
   />
)

const WidgetSettingsLength = () => {

   const [memorable, setMemorable] = useGlobal('settings.isMemorable');
   const [letters, setLetters] = useGlobal('settings.length');
   const [words, setWords] = useGlobal('settings.numWords');

   const [num, set] = memorable 
      ? [words, setWords]
      : [letters, setLetters];
   const label = memorable ? 'words' : 'letters';

   const incUp = () => set(num + 1);
   const incDown = () => set(num - 1);
   const handleToggle = (e) => setMemorable(e.target.checked);

   return (
      <div>
         <Switch
            checked={memorable}
            onChange={handleToggle}
            color="primary"
         />
         <label>Memorizable</label>
         <Increment
            value={`${num} ${label}`}
            incUp={incUp}
            incDown={incDown}
         />
      </div>
   )
}

export default WidgetSettingsLength;