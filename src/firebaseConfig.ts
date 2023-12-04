import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDshXm1Zw3PrgHHjlmLlYZp-YVwrWqWvC8",
	authDomain: "ionic-union-a6eca.firebaseapp.com",
	projectId: "ionic-union-a6eca",
	storageBucket: "ionic-union-a6eca.appspot.com",
	messagingSenderId: "154700112161",
	appId: "1:154700112161:web:3f3786c459abeb792e1e60",
	measurementId: "G-L7F5XFG4L1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

auth.languageCode = "it";

provider.setCustomParameters({
	login_hint: "user@example.com",
});

// signInWithRedirect(auth, provider);

export async function loginUser(email: string, password: string) {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log(user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.log(errorCode);
			console.log(errorMessage);
		});
}

export async function registerUser(email: string, password: string) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up
			const user = userCredential.user;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
}

export async function loginWithGooglePopup() {
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential!.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
}

// export async function loginWithGoogleRedirect() {
// 	getRedirectResult(auth)
// 		.then((result) => {
// 			// This gives you a Google Access Token. You can use it to access Google APIs.
// 			const credential = GoogleAuthProvider.credentialFromResult(result!);
// 			const token = credential!.accessToken;

// 			// The signed-in user info.
// 			const user = result!.user;
// 			// IdP data available using getAdditionalUserInfo(result)
// 			// ...
// 		})
// 		.catch((error) => {
// 			// Handle Errors here.
// 			const errorCode = error.code;
// 			const errorMessage = error.message;
// 			// The email of the user's account used.
// 			const email = error.customData.email;
// 			// The AuthCredential type that was used.
// 			const credential = GoogleAuthProvider.credentialFromError(error);
// 			// ...
// 		});
// }
