import React from 'react';
import useGlobal from '../api/store';
import { login, logout } from '../api/auth';
import Avatar from '../ui/Avatar';
import styles from '../styles/AuthButton.module.css';

const AuthButton = () => {
	const [user] = useGlobal('user');
	return (
		<div className={styles.root}>
			<button
				onClick={user ? logout : login}
				className={styles.btn}
			>
				{user ? "log out" : "log in"}
			</button>
			{user && 
				<Avatar 
					photo={user.photoURL} 
					username={user.displayName}
				/>
			}
		</div>
	);
};

export default AuthButton;