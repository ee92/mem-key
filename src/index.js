import React from 'react'
import ReactDOM from 'react-dom'
import { StatebaseProvider } from 'react-statebase'
import App from './App.js'
import './index.css'
import {initialState} from './api/state.js'

ReactDOM.render(
	<StatebaseProvider initialState={initialState}>
		<App />
	</StatebaseProvider>,
	document.getElementById('root')
)
