import React from 'react';
import { withStatebase, useStatebase } from '../Test';
import { copy } from '../api/utils.js';
import { noHover } from '../styles/Mui.module.css';
import Input from '../ui/Input.js';
import VisibilityToggle from '../ui/VisibiltyToggle';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';

let GeneratedKey = (props) => {

   const sb = props.statebase;
   const siteRef = sb.ref('inputs').ref('site');
   const emailRef = sb.ref('inputs').ref('email');
   const secretRef = sb.ref('inputs').ref('secret');
   const keyRef = sb.ref('generatedKey');
   const showRef = sb.ref('visibility').ref('generatedKey');

   const [site] = useStatebase(siteRef);
   const [email] = useStatebase(emailRef);
   const [secret] = useStatebase(secretRef);
   const [key] = useStatebase(keyRef)
   const [show, setShow] = useStatebase(showRef)

   if (!key || !site || !email || !secret) return null;

   const toggleShow = () => setShow(!show);
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