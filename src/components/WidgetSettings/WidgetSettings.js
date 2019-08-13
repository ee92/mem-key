import React, { useEffect } from 'react';
import useGlobal from '../../api/store';
import WidgetSettingsLength from '../WidgetSettingsLength';
import WidgetSettingsSymbols from '../WidgetSettingsSymbols';
import WidgetSettingsSalt from '../WidgetSettingsSalt';
import PasswordPreview from '../PasswordPreview';
import WidgetSettingsControls from '../WidgetSettingsControls';
import styles from './WidgetSettings.module.css';

import Dialog from '@material-ui/core/Dialog'

const WidgetSettings = () => {
   const [settings, setSettings] = useGlobal('settings');
   const [prevSettings, setPrevSettings] = useGlobal('prevSettings');
   const [show, setShow] = useGlobal('visibility.settings');

   
   useEffect(() => {
      if (show) setPrevSettings(settings);
      // eslint-disable-next-line
   }, [show]);

   const cancel = () => {
      setSettings(prevSettings);
      setShow(false);
   }

   return (
      <Dialog
         open={show}
         onClose={cancel}
         maxWidth="xl"
         classes={{
            paper: styles.paper
         }}
      >
         <div className={styles.root}>
            <h2>Password Settings</h2>
            <WidgetSettingsLength/>
            <WidgetSettingsSymbols/>
            <WidgetSettingsSalt/>
            <PasswordPreview/>
            <WidgetSettingsControls 
               save={() => setShow(false)}
               cancel={cancel}
            />
         </div>
      </Dialog>
   )
}

export default WidgetSettings;