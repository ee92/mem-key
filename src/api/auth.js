import { auth, googleAuth } from '../firebase.js';

export const listenAuth = (callback) => {
   return auth.onAuthStateChanged(callback);
}

export const login = () => {
   auth.signInWithPopup(googleAuth);
}

export const logout = () => {
   auth.signOut();
}