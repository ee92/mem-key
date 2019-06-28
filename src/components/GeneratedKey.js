import React from 'react';
import { withStatebase } from 'react-statebase';
import { copy } from '../api/utils.js';
import { noHover } from '../styles/Mui.module.css';

import AssignmentReturned from '@material-ui/icons/AssignmentReturned';

import Input from '../ui/Input.js';
import VisibilityToggle from '../ui/VisibiltyToggle';

let GeneratedKey = (props) => {

   const sb = props.statebase
   const { site, email, secret } = sb.ref('inputs').val();
   const generatedKey = sb.ref('generatedKey').val();
   const show = sb.ref('visibility').ref('generatedKey')
   if (!generatedKey || !site || !email || !secret) return null;
   return (
      <div style={{display: 'flex', alignItems: 'flex-end'}}>
         <Input
            value={generatedKey}
            type={show.val() ? "text" : "password"}
            label={"Password for " + site}
            fullWidth
            readOnly
            attach={
               <VisibilityToggle
                  on={show.val()}
                  toggle={() => show.set(!show.val())}
               />
            }
         />
         <span
            onClick={() => copy(generatedKey)}
            className={noHover}
         >
            <AssignmentReturned/>
         </span>
      </div>
   );
}

export default withStatebase(GeneratedKey);