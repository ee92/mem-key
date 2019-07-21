import React from 'react';
import useGlobal from '../../api/store';
import Input from '../../ui/Input';
import Switch from '../../ui/Switch';
import styles from './WidgetSettingsSymbols.module.css';

const WidgetSettingsSymbols = () => {
   const [usesSymbols, setUsesSymbols] = useGlobal('settings.includeSymbol');
   const [symbols, setSymbols] = useGlobal('settings.symbols');

   const handleToggle = (e) => setUsesSymbols(e.target.checked);
   const handleInput = (e) => {
      const re = /^[!@#$%^&*?]+$/;
      const value = e.target.value;
      re.test(value) && setSymbols(value);
   }

   return (
      <div className={styles.root}>
         <Switch
            checked={usesSymbols}
            onChange={handleToggle}
         />
         <label>Symbols</label>
         <Input
            value={symbols}
            onChange={handleInput}
            disabled={!usesSymbols}
            fullWidth
         />
      </div>
   )
}
export default WidgetSettingsSymbols;