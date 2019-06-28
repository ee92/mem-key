import React from 'react';
import { withStatebase } from 'react-statebase';
import { login, logout } from '../api/auth.js';
import styles from '../styles/AuthButton.module.css';

let AuthButton = (props) => {
	let user = props.statebase.ref('user').val();
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