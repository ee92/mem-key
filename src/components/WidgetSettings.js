import React from 'react';
import useGlobal from '../api/store';
import WidgetSettingsLength from './WidgetSettingsLength';
import WidgetSettingsSymbols from './WidgetSettingsSymbols';
import WidgetSettingsSalt from './WidgetSettingsSalt';

const WidgetSettings = () => {
   const [show] = useGlobal('visibility.settings');
   if (!show) return null
   return (
      <div>
         <WidgetSettingsLength/>
         <WidgetSettingsSymbols/>
         <WidgetSettingsSalt/>
      </div>
   )
}

export default WidgetSettings;