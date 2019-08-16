import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   setIsMemorable,
   setNumWords,
   setNumLetters } from '../../redux/modules/settings';
import Input from '../../ui/Input';
import IconButton from '../../ui/IconButton';
import Switch from '../../ui/Switch';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from './WidgetSettingsLength.module.css';

const Increment = props => (
   <Input
      value={props.value}
      readOnly
      fullWidth
      attach={
         <React.Fragment>
            <IconButton onClick={props.incDown}>
               <ExpandMore/>
            </IconButton>
            <IconButton onClick={props.incUp}>
               <ExpandLess/>
            </IconButton>
         </React.Fragment>
      }
   />
)

const WidgetSettingsLength = () => {
   const dispatch = useDispatch();
   const props = useSelector(state => ({
      isMemorable: state.settings.isMemorable,
      numWords: state.settings.numWords,
      numLetters: state.settings.numLetters
   }));
   const {isMemorable, numWords, numLetters} = props;

   const [num, set] = isMemorable 
      ? [numWords, setNumWords]
      : [numLetters, setNumLetters];
   const label = isMemorable ? 'words' : 'letters';

   const incUp = () => dispatch(set(num + 1));
   const incDown = () => dispatch(set(num - 1));
   const handleToggle = (e) => dispatch(setIsMemorable(e.target.checked));

   return (
      <div className={styles.root}>
         <Switch
            checked={isMemorable}
            onChange={handleToggle}
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