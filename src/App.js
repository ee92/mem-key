import React from 'react';
import { withStatebase } from 'react-statebase';
import { listenAuth } from './api/auth';
import { listenItems } from './api/database';
import AuthButton from './components/AuthButton';
import PasswordWidget from './components/PasswordWidget';

class App extends React.Component {

	listenForSites = (userId) => {
		this.siteListener = listenItems(
			userId,
			this.props.statebase.ref('siteList').set
		)
	}

	componentDidMount() {
		const state = this.props.statebase
		this.authListener = listenAuth((user) => {
			if (!user) {
				state.ref('user').val() && state.reset()
				return
			}
			state.ref('user').set(user)
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
				<AuthButton />
				<PasswordWidget />
			</div>
		);
	}
}

export default withStatebase(App);
