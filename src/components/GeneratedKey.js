import React from 'react';
import { withStatebase } from 'react-statebase';
import { copy } from '../api/utils.js';
import { noHover } from '../styles/Mui.module.css';
import Input from '../ui/Input.js';
import VisibilityToggle from '../ui/VisibiltyToggle';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';

let GeneratedKey = (props) => {

   const sb = props.statebase;
   const { site, email, secret } = sb.ref('inputs').val();
   const key = sb.ref('generatedKey').val();
   if (!key || !site || !email || !secret) return null;

   const showRef = sb.ref('visibility').ref('generatedKey');
   const show = showRef.val();

   const toggleShow = () => showRef.set(!show);
   const clipboard = () => copy(key);

   return (
      <div style={{display: 'flex', alignItems: 'flex-end'}}>
         <Input
            value={key}
            type={show ? "text" : "password"}
            label={"Password for " + site}
            fullWidth
            readOnly
            attach={
               <VisibilityToggle
                  on={show}
                  toggle={toggleShow}
               />
            }
         />
         <span
            onClick={clipboard}
            className={noHover}
         >
            <AssignmentReturned/>
         </span>
      </div>
   );
};

export default withStatebase(GeneratedKey);