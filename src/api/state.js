export let initialState = {
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