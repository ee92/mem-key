import React from 'react';
import useGlobal from '../api/store';
import { login, logout } from '../api/auth.js';
import styles from '../styles/AuthButton.module.css';

const AuthButton = () => {
	const [user] = useGlobal('user');
	return (
		<button
			onClick={user ? logout : login}
			className={styles.btn}
		>
			{user ? "SIGN OUT" : "SIGN IN"}
		</button>
	);
};

export default AuthButton;