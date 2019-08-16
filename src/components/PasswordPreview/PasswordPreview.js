import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './PasswordPreview.module.css';
import VisibilityToggle from '../../ui/VisibiltyToggle';

export const PasswordPreview = () => {
   const [show, setShow] = useState(false);
   const {site, email, secret, preview} = useSelector(state => ({
      site: state.inputs.site,
      email: state.inputs.email,
      secret: state.inputs.secret,
      preview: state.passwordPreview
   }));

   if (!site || !email || !secret) return null;
   return (
      <div className={styles.root}>
         <VisibilityToggle on={show} toggle={() => setShow(!show)}/>
         <div onClick={() => setShow(!show)} className={styles.text}>
            {show ? preview : `click to preview password for ${site}`}
         </div>
      </div>
   )
}

export default PasswordPreview;