import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { copy } from '../../api/utils';
import styles from './WidgetGeneratedKey.module.css';
import Input from '../../ui/Input';
import VisibilityToggle from '../../ui/VisibiltyToggle';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';
import IconButton from '../../ui/IconButton';

import Snackbar from '@material-ui/core/Snackbar';

const WidgetGeneratedKey = () => {
   const [copied, setCopied] = useState(false);
   const [showKey, setShowKey] = useState(false);
   
   const props = useSelector(state => ({
      site: state.inputs.site,
      email: state.inputs.email,
      secret: state.inputs.secret,
      password: state.password
   }));

   const {
      site,
      email,
      secret,
      password
   } = props;

   const toggleShow = () => setShowKey(show => !show);
   
   const clipboard = () => {
      copy(password);
      setCopied(true);
   }

   const hidden = (!password || !site || !email || !secret);

   return (
      <div
         className={styles.root}
         style={{
            transition: "all 600ms cubic-bezier(0.93, 0.01, 0.33, 1) 0s",
            opacity: hidden ? 0 : 1,
            maxHeight: hidden ? '0px' : '200px',
            padding: hidden && 0,
            overflow: 'hidden'
         }}
      >
         <Input
            value={password}
            type={showKey ? "text" : "password"}
            label={"Password for " + site}
            fullWidth
            readOnly
            attach={
               <VisibilityToggle
                  on={showKey}
                  toggle={toggleShow}
               />
            }
         />
         <IconButton
            onClick={clipboard}
            className={styles.noMargin}
         >
            <AssignmentReturned/>
         </IconButton>
         <Snackbar
            open={copied}
            onClose={() => setCopied(false)}
            message="Copied to clipboard"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={1500}
         />
      </div>
   );
};

export default WidgetGeneratedKey;