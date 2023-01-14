<script>
	// Import the functions you need from the SDKs you need
	import { initializeApp } from "firebase/app";
	import { getAnalytics } from "firebase/analytics";

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
	const analytics = getAnalytics(app);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
