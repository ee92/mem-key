import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import config from './config/firebase';

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

const googleAuth = new firebase.auth.GoogleAuthProvider();

export {
	firebase,
	auth,
	googleAuth,
	db
}
