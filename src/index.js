import React from 'react'
import ReactDOM from 'react-dom'
import { StatebaseProvider } from 'react-statebase';
import App from './App.js'
import './index.css'

const initialState = {
	user: null,
	siteList: [],
	inputs: {
		site: "",
		email: "",
		secret: ""
	},
	visualHint: [],
	generatedKey: "",
	settings: {
		isMemorable: true,
		length: 10,
		numWords: 3,
		includeSymbol: true,
		symbols: "@#$%^&*?!",
		useSalt: false,
		salt: ""
	},
	visibility: {
		settings: false,
		secret: false,
		generatedKey: false
	}
}

ReactDOM.render(
	<StatebaseProvider initialState={initialState}>
		<App />
	</StatebaseProvider>,
	document.getElementById('root')
)
