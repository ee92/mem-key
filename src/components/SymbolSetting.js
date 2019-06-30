import React from 'react';
import { withStatebase, useStatebase } from '../Test';
import Input from '../ui/Input.js';

const SymbolSetting = (props) => {
   const settings = props.statebase.ref('settings');
   const includeSymbolRef = settings.ref('includeSymbol');
   const symbolsRef = settings.ref('symbols');

   const [includeSymbol, setIncludeSymbol] = useStatebase(includeSymbolRef);
   const [symbols, setSymbols] = useStatebase(symbolsRef);

   const handleToggle = (e) => setIncludeSymbol(e.target.checked);
   const handleInput = (e) => setSymbols(e.target.value);

   return (
      <div>
         <input
            type="checkbox"
            checked={includeSymbol}
            onChange={handleToggle}
         />
         <label>include symbol</label>
         {includeSymbol && <Input
            value={symbols}
            onChange={handleInput}
            fullWidth
         />}
      </div>
   )
}

export default withStatebase(SymbolSetting);