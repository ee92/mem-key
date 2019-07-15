import React from 'react';
import useGlobal from '../api/store';
import { login, logout } from '../api/auth';
import styles from '../styles/AuthButton.module.css';

const AuthButton = () => {

	const [user] = useGlobal('user');
	const Avatar = () => {
		if (!user) return null;
		if (user.photoURL) {
			return (
				<img
					src={user.photoURL}
					className={styles.avatar}
					alt="user avatar"
				/>
			)
		}
		return (
			<span className={styles.avatar}>
				{user.displayName.charAt(0)}
			</span>
		)
	}

	return (
		<div className={styles.root}>
			<button
				onClick={user ? logout : login}
				className={styles.btn}
			>
				{user ? "log out" : "log in"}
			</button>
			<Avatar/>
		</div>
	);
};

export default AuthButton;