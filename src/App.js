import React, { useEffect } from 'react';
import { withStatebase, useStatebase } from 'react-statebase';
import { listenAuth } from './api/auth';
import { listenItems } from './api/database';
import NavBar from './components/NavBar';
import Widget from './components/Widget';

const App = (props) => {
	const sb = props.statebase;
	const userRef = sb.ref('user');
	const siteListRef = sb.ref('siteList');

	const [user, setUser] = useStatebase(userRef);
	const [, setSiteList] = useStatebase(siteListRef);

	useEffect(() => {
		let siteListener
		const authListener = listenAuth((auth) => {
			if (!auth) {
				user && sb.reset()
				return
			}
			setUser(auth)
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

export default withStatebase(App);
