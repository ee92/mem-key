import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../../redux/modules/inputs';
import Input from '../../ui/Input';

const WidgetInputsEmail = () => {
   const dispatch = useDispatch();
	const email = useSelector(state => state.inputs.email);
   return (
      <Input
         value={email}
         onChange={(e) => dispatch(setEmail(e.target.value))}
         label="Username/Email"
         fullWidth
      />
   );
};

export default WidgetInputsEmail;