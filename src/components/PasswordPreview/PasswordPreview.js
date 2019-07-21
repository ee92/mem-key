import React, { useEffect, useState } from 'react';
import useGlobal from '../../api/store';
import {createKey} from '../../api/generate';
import styles from './PasswordPreview.module.css';
import VisibilityToggle from '../../ui/VisibiltyToggle';

export const PasswordPreview = () => {
   const [show, setShow] = useState(false)

   const [inputs] = useGlobal('inputs');
   const [settings] = useGlobal('settings');
   const [key, setKey] = useGlobal('generatedKeyPreview')

   useEffect(() => {
      const password = createKey(
         inputs.site,
         inputs.email,
         inputs.secret, 
         settings
      );
      setKey(password)
   }, [settings, inputs, setKey])

   if (!inputs.site || !inputs.email || !inputs.secret) return null;
   return (
      <div className={styles.root}>
         <VisibilityToggle on={show} toggle={() => setShow(!show)}/>
         <div onClick={() => setShow(!show)} className={styles.text}>
            {show ? key : `click to preview password for ${inputs.site}`}
         </div>
      </div>
   )
}

export default PasswordPreview;