import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/modules/user';
import { setSiteList } from './redux/modules/siteList';
import { listenAuth } from './api/auth';
import { listenItems } from './api/database';
import NavBar from './components/NavBar';
import Widget from './components/Widget';

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	useEffect(() => {
		if (user) {
			const siteListener = listenItems(user.uid, (payload) => {
				const event = setSiteList(payload);
				dispatch(event);
			});
			return () => {
				siteListener && siteListener();
			};
		}
	}, [user, dispatch]);

	useEffect(() => {
		const authListener = listenAuth((user) => {
			const event = user ? login(user) : logout();
			dispatch(event);
		});
		return () => {
			authListener && authListener();
		};
	}, [dispatch]);

	return (
		<div>
			<NavBar/>
			<Widget/>
		</div>
	);
};

export default App;
