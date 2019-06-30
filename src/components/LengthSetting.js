import React, {useEffect} from 'react';
import { withStatebase, useStatebase } from '../Test';
import { noHover } from '../styles/Mui.module.css';

import Input from '../ui/Input';
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

const LengthSetting = (props) => {
   const sb = props.statebase;
   const settings = sb.ref('settings');
   const memRef = settings.ref('isMemorable');
   const lettersRef = settings.ref('length');
   const wordsRef = settings.ref('numWords');

   const [memorable, setMemorable] = useStatebase(memRef);
   const [letters, setLetters] = useStatebase(lettersRef);
   const [words, setWords] = useStatebase(wordsRef);

   const [num, set] = memorable 
      ? [words, setWords]
      : [letters, setLetters];
   const label = memorable ? 'words' : 'letters';

   const incUp = () => set(num + 1);
   const incDown = () => set(num - 1);
   const handleToggle = (e) => setMemorable(e.target.checked);

   useEffect(() => {
      console.log(words, letters)
   }, [words, letters])

   return (
      <div>
         <input
            type="checkbox"
            checked={memorable}
            onChange={handleToggle}
         />
         <label>is memorable</label>
         <Increment
            value={`${num} ${label}`}
            incUp={incUp}
            incDown={incDown}
         />
      </div>
   )
}

export default withStatebase(LengthSetting);