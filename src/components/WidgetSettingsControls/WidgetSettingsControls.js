import React from 'react';
import styles from './WidgetSettingsControls.module.css';

export const WidgetSettingsControls = ({close}) => {
   const cancel = () => {
      close()
   }
   const save = () => {
      close()
   }
   return (
      <div className={styles.root}>
         <button
            className={styles.cancel}
            onClick={cancel}
         >
            cancel
         </button>
         <button
            className={styles.save}
            onClick={save}
         >
            save
         </button>
      </div>
   )
}

export default WidgetSettingsControls;