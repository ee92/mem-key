import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyBlHKEDVvcpqswaOelEDHySw2t24cYi5Ow",
	authDomain: "mem-key.firebaseapp.com",
	databaseURL: "https://mem-key.firebaseio.com",
	projectId: "mem-key",
	storageBucket: "",
	messagingSenderId: "905763876608",
	appId: "1:905763876608:web:e3cc67b558db0b6a"
};

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()

const googleAuth = new firebase.auth.GoogleAuthProvider()
// const githubAuth = new firebase.auth.GithubAuthProvider()

export {
	firebase,
	auth,
	googleAuth,
	// githubAuth,
	db
}
