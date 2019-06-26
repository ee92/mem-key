import React from 'react'
import ReactDOM from 'react-dom'
import { StatebaseProvider } from 'react-statebase'
import App from './App.js'
import './index.css'

let initialState = {
	user: null,
	siteList: [],
	inputs: {
		site: "",
		email: "",
		secret: ""
	},
	visualHint: [],
	generatedKey: "",
	showSettings: false,
	settings: {
		isMemorable: true,
		length: 10,
		numWords: 3,
		includeSymbol: true,
		symbols: "@#$%^&*?!",
		useSalt: false,
		salt: ""
	 }
}

ReactDOM.render(
	<StatebaseProvider initialState={initialState}>
		<App />
	</StatebaseProvider>,
	document.getElementById('root')
)
