import React from 'react';
import { withStatebase, useStatebase } from 'react-statebase';
import WidgetSettingsLength from './WidgetSettingsLength';
import WidgetSettingsSymbols from './WidgetSettingsSymbols';
import WidgetSettingsSalt from './WidgetSettingsSalt';

const WidgetSettings = (props) => {
   const sb = props.statebase;
   const showSettingsRef = sb.ref('visibility').ref('settings');
   const [show] = useStatebase(showSettingsRef);
   if (!show) return null
   return (
      <div>
         <WidgetSettingsLength/>
         <WidgetSettingsSymbols/>
         <WidgetSettingsSalt/>
      </div>
   )
}

export default withStatebase(WidgetSettings);