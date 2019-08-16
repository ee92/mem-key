import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSymbols, setUseSymbols } from '../../redux/modules/settings';
import Input from '../../ui/Input';
import Switch from '../../ui/Switch';
import styles from './WidgetSettingsSymbols.module.css';

const WidgetSettingsSymbols = () => {

   const dispatch = useDispatch();
   const { useSymbols, symbols } = useSelector(state => ({
      useSymbols: state.settings.useSymbols,
      symbols: state.settings.symbols
   }));

   const handleToggle = (e) => dispatch(setUseSymbols(e.target.checked));
   const handleInput = (e) => {
      const re = /^[!@#$%^&*?+-_<>(){}=]+$/;
      const value = e.target.value;
      re.test(value) && dispatch(setSymbols(value));
   }

   return (
      <div className={styles.root}>
         <Switch
            checked={useSymbols}
            onChange={handleToggle}
         />
         <label>Symbols</label>
         <Input
            value={symbols}
            onChange={handleInput}
            disabled={!useSymbols}
            fullWidth
         />
      </div>
   )
}
export default WidgetSettingsSymbols;