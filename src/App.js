import React, { useEffect } from 'react';
import useGlobal from './api/store';
import { listenAuth } from './api/auth';
import { listenItems } from './api/database';
import NavBar from './components/NavBar';
import Widget from './components/Widget';

const App = () => {
	const [, setUser] = useGlobal('user');
	const [, setSiteList] = useGlobal('siteList');

	useEffect(() => {
		let siteListener
		const authListener = listenAuth((auth) => {
			// TODO: reset entire state if user logs in or out !!!
			setUser(auth)
			if (!auth) return
			siteListener = listenItems(auth.uid, setSiteList)
		})
		return () => {
			authListener && authListener()
			siteListener && siteListener()
		}
	// eslint-disable-next-line
	}, [])

	return (
		<div>
			<NavBar/>
			<Widget/>
		</div>
	);
}

export default App;
