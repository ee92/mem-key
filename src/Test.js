import React, {useEffect, useState} from 'react';
import createState from 'statebase';

const Statebase = React.createContext(null);

export class StatebaseProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = createState(props.initialState);
	}
	render() {
		return (
			<Statebase.Provider value={this.state}>
				{this.props.children}
			</Statebase.Provider>
		)
	}
}

export const withStatebase = (Component) => {
	return class extends React.Component {
		render () {
			return (
				<Statebase.Consumer>
					{(state) => (
						<Component {...this.props} statebase={state}/>
					)}
				</Statebase.Consumer>
			)
		}
	}
}

export const useStatebase = (ref) => {
   const [state, setState] = useState(ref.val())
   useEffect(() => ref.listen((snap) => setState(snap.val()), []))
   return [state, ref.set]
}
