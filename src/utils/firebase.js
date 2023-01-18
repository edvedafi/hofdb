import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDaaJXLcG-RaIJmi9mLXjwqcptcB3_IJRE",
	authDomain: "hofdb-2038e.firebaseapp.com",
	projectId: "hofdb-2038e",
	storageBucket: "hofdb-2038e.appspot.com",
	messagingSenderId: "78796187147",
	appId: "1:78796187147:web:aa89f01d66d63dfc5d490e",
	measurementId: "G-4T1D5KNQ7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

 export const getKey = id=> id.replace(/[^a-zA-Z]/g,'');
