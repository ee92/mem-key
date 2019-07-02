import React from 'react';
import { withStatebase, useStatebase } from 'react-statebase';
import { login, logout } from '../api/auth.js';
import styles from '../styles/AuthButton.module.css';

const AuthButton = (props) => {
	const sb = props.statebase;
	const userRef = sb.ref('user');
	const [user] = useStatebase(userRef);
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