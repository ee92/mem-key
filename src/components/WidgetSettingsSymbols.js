import React from 'react';
import { withStatebase, useStatebase } from 'react-statebase';
import Input from '../ui/Input.js';

import Switch from '@material-ui/core/Switch';

const WidgetSettingsSymbol = (props) => {
   const settings = props.statebase.ref('settings');
   const includeSymbolRef = settings.ref('includeSymbol');
   const symbolsRef = settings.ref('symbols');

   const [includeSymbol, setIncludeSymbol] = useStatebase(includeSymbolRef);
   const [symbols, setSymbols] = useStatebase(symbolsRef);

   const handleToggle = (e) => setIncludeSymbol(e.target.checked);
   const handleInput = (e) => {
      const re = /^[!@#$%^&*?]+$/;
      const value = e.target.value;
      re.test(value) && setSymbols(value);
   }

   return (
      <div>
         <Switch
            checked={includeSymbol}
            onChange={handleToggle}
            color="primary"
         />
         <label>Symbols</label>
         {includeSymbol && <Input
            value={symbols}
            onChange={handleInput}
            fullWidth
         />}
      </div>
   )
}
export default withStatebase(WidgetSettingsSymbol);