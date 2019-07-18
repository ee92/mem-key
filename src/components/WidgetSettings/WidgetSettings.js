import React from 'react';
import useGlobal from '../../api/store';
import WidgetSettingsLength from '../WidgetSettingsLength';
import WidgetSettingsSymbols from '../WidgetSettingsSymbols';
import WidgetSettingsSalt from '../WidgetSettingsSalt';
import styles from './WidgetSettings.module.css';

import Dialog from '@material-ui/core/Dialog'

const WidgetSettings = () => {
   const [show, setShow] = useGlobal('visibility.settings');
   return (
      <Dialog open={show} onClose={() => setShow(false)} maxWidth="xl">
         <div className={styles.root}>
            <h2>Password Settings</h2>
            <WidgetSettingsLength/>
            <WidgetSettingsSymbols/>
            <WidgetSettingsSalt/>
         </div>
      </Dialog>
   )
}

export default WidgetSettings;