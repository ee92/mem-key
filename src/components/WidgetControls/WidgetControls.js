import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generatePassword } from '../../redux/modules/password';
import { setShowSettings } from '../../redux/modules/showSettings';
import styles from './WidgetControls.module.css'

import Settings from '@material-ui/icons/Settings';

const WidgetControls = () => {

   const dispatch = useDispatch();
   const props = useSelector(state => {
      return {
         site: state.inputs.site,
         email: state.inputs.email,
         secret: state.inputs.secret,
         showSettings: state.showSettings
      }
   });
   
   const {
      site,
      email,
      secret,
      showSettings
   } = props;

   const toggleSettings = () => {
      dispatch(setShowSettings(!showSettings));
   }

   return (
      <div className={styles.root}>
         <button
            disabled={!site || !email|| !secret}
            onClick={() => dispatch(generatePassword())}
            className={styles.generate}
         >
            Generate
         </button>
         <button
            onClick={toggleSettings}
            className={styles.settings}
         >
            <Settings/>
         </button>
      </div>
   );
};

export default WidgetControls;