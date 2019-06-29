import React from 'react';
import { withStatebase } from './Test';
import { listenAuth } from './api/auth';
import { listenItems } from './api/database';
import NavBar from './components/NavBar';
import PasswordWidget from './components/PasswordWidget';

class App extends React.Component {

	listenForSites = (userId) => {
		this.siteListener = listenItems(
			userId,
			this.props.statebase.ref('siteList').set
		)
	}

	componentDidMount() {
		const sb = this.props.statebase
		this.authListener = listenAuth((user) => {
			if (!user) {
				sb.ref('user').val() && sb.reset()
				return
			}
			sb.ref('user').set(user)
			this.listenForSites(user.uid)
		})
	}

	componentWillUnmount() {
		this.authListener && this.authListener()
		this.siteListener && this.siteListener()
	}

	render() {
		return (
			<div>
				<NavBar/>
				<PasswordWidget/>
			</div>
		);
	}
}

export default withStatebase(App);
