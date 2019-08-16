import React from 'react';
import { useSelector } from 'react-redux';
import { login, logout } from '../../api/auth';
import Avatar from '../../ui/Avatar';
import styles from './Auth.module.css';

const Auth = () => {
	const user = useSelector(state => state.user);
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

export default Auth;