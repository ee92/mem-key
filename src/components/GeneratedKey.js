import React from 'react';
import { withStatebase } from 'react-statebase';
import { copy } from '../api/utils.js';
import { noHover } from '../styles/Mui.module.css';

import IconButton from '@material-ui/core/IconButton';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';

import Input from '../ui/Input.js';
import VisibilityToggle from '../ui/VisibiltyToggle';

let GeneratedKey = (props) => {
   const { site, email, secret } = props.statebase.ref('inputs').val();
   const generatedKey = props.statebase.ref('generatedKey').val();
   if (!generatedKey || !site || !email || !secret) return null;
   return (
      <div style={{display: 'flex', alignItems: 'flex-end'}}>
         <Input
            value={generatedKey}
            // type="password"
            label={"Password for " + site}
            fullWidth
            readOnly
            attach={<VisibilityToggle/>}
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