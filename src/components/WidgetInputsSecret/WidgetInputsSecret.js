import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSecret } from '../../redux/modules/inputs';
import { setVisualHint } from '../../redux/modules/visualHint';
import { visualAid } from '../../api/generate';
import Input from '../../ui/Input';
import VisibilityToggle from '../../ui/VisibiltyToggle';
import styles from './WidgetInputsSecret.module.css'

const WidgetInputsSecret = () => {
   const [showSecret, setShowSecret] = useState(false);
   const dispatch = useDispatch();
	const { secret, hint } = useSelector(state => ({
      secret: state.inputs.secret,
      hint: state.visualHint
   }));

   const toggleShow = () => setShowSecret(show => !show);
   const handleInput = (e) => {
      const hintValue = visualAid(e.target.value);
      dispatch(setSecret(e.target.value));
      dispatch(setVisualHint(hintValue));
   };
   
   return (
      <div className={styles.root}>
         <Input
            value={secret}
            type={showSecret ? "text" : "password"}
            onChange={handleInput}
            label="MemKey"
            fullWidth
            attach={
               <VisibilityToggle
                  toggle={toggleShow}
                  on={showSecret}
               />
            }
         />
         {hint.map(icon =>
            <i
               key={icon[0]}
               className={`fas fa-${icon[0]} ${styles.icon}`}
               style={{color: icon[1]}}
            />
         )}
      </div>
   );
};

export default WidgetInputsSecret;