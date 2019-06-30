import React, { useEffect } from 'react';
import { withStatebase, useStatebase } from '../Test';
import LengthSetting from './LengthSetting';
import SymbolSetting from './SymbolSetting';
import SaltSetting from './SaltSetting';

const Settings = (props) => {
   const sb = props.statebase;
   const showSettingsRef = sb.ref('visibility').ref('settings');
   const [show] = useStatebase(showSettingsRef);
   if (!show) return null
   return (
      <div>
         <LengthSetting/>
         <SymbolSetting/>
         <SaltSetting/>
      </div>
   )
}

export default withStatebase(Settings);