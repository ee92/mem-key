import React from 'react';
import useGlobal from '../api/store';
import Input from '../ui/Input.js';

import Switch from '@material-ui/core/Switch';

const WidgetSettingsSymbol = () => {

   const [usesSymbol, setUsesSymbol] = useGlobal('settings.includeSymbol');
   const [symbols, setSymbols] = useGlobal('settings.symbols');

   const handleToggle = (e) => setUsesSymbol(e.target.checked);
   const handleInput = (e) => {
      const re = /^[!@#$%^&*?]+$/;
      const value = e.target.value;
      re.test(value) && setSymbols(value);
   }

   return (
      <div>
         <Switch
            checked={usesSymbol}
            onChange={handleToggle}
            color="primary"
         />
         <label>Symbols</label>
         {usesSymbol && <Input
            value={symbols}
            onChange={handleInput}
            fullWidth
         />}
      </div>
   )
}
export default WidgetSettingsSymbol;