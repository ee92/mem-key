import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSettings } from '../../redux/modules/settings';
import { setPrevSettings } from '../../redux/modules/prevSettings';
import { setShowSettings } from '../../redux/modules/showSettings';
import WidgetSettingsLength from '../WidgetSettingsLength';
import WidgetSettingsSymbols from '../WidgetSettingsSymbols';
import WidgetSettingsSalt from '../WidgetSettingsSalt';
import PasswordPreview from '../PasswordPreview';
import WidgetSettingsControls from '../WidgetSettingsControls';
import styles from './WidgetSettings.module.css';

import Dialog from '@material-ui/core/Dialog'

const WidgetSettings = () => {

   const dispatch = useDispatch();
   const { settings, prevSettings, show } = useSelector(state => ({
      settings: state.settings,
      prevSettings: state.prevSettings,
      show: state.showSettings
   }));
   
   useEffect(() => {
      if (show) dispatch(setPrevSettings(settings));
      // eslint-disable-next-line
   }, [show]);

   const cancel = () => {
      dispatch(setSettings(prevSettings));
      dispatch(setShowSettings(false));
   };

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
               save={() => dispatch(setShowSettings(false))}
               cancel={cancel}
            />
         </div>
      </Dialog>
   )
}

export default WidgetSettings;