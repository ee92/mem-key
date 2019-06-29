import React from 'react';
import { withStatebase, useStatebase } from '../Test';
import { login, logout } from '../api/auth.js';
import styles from '../styles/AuthButton.module.css';

let AuthButton = (props) => {
	const ref = props.statebase.ref('user');
	const [user] = useStatebase(ref);
	return (
		<button
			onClick={user ? logout : login}
			className={styles.btn}
		>
			{user ? "SIGN OUT" : "SIGN IN"}
		</button>
	);
};

export default withStatebase(AuthButton);