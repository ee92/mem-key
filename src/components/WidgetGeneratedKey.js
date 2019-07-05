import React from 'react';
import useGlobal from '../api/store';
import { copy } from '../api/utils.js';
import { noHover, noMargin } from '../styles/Mui.module.css';
import Input from '../ui/Input.js';
import VisibilityToggle from '../ui/VisibiltyToggle';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';
import { IconButton } from '@material-ui/core';

const WidgetGeneratedKey = () => {
   const [site] = useGlobal('inputs.site');
   const [email] = useGlobal('inputs.email');
   const [secret] = useGlobal('inputs.secret');
   const [key] = useGlobal('generatedKey')
   const [showKey, setShowKey] = useGlobal('visibility.generatedKey')

   if (!key || !site || !email || !secret) return null;

   const toggleShow = () => setShowKey(!showKey);
   const clipboard = () => copy(key);

   return (
      <div style={{display: 'flex', alignItems: 'flex-end'}}>
         <Input
            value={key}
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
            className={`${noHover} ${noMargin}`}
         >
            <AssignmentReturned/>
         </IconButton>
      </div>
   );
};

export default WidgetGeneratedKey;