import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	onAuthStateChanged,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
import {
	getFirestore,
	setDoc,
	doc,
	addDoc,
	collection,
	getDoc,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import { useState } from "react";

export const firebaseConfig = {
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

export const db = getFirestore(app);

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
		.then(async (result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential!.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...

			// await setDoc(doc(db, "users", user.uid), {
			// 	name: user.displayName,
			// 	email: user.email,
			// 	role: "user",
			// 	organizations: ["umn"],
			// });

			const userRef = doc(db, "users", user.uid);
			const userSnapshot = await getDoc(userRef);

			if (!userSnapshot.exists()) {
				// User doesn't exist, create a new entry
				await setDoc(userRef, {
					name: user.displayName,
					email: user.email,
					role: "user",
					organizations: ["umn"],
				});
			} else {
				// User already exists
				console.log("User already exists in the database");
			}
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

export async function logoutUser() {
	auth.signOut();
}

export async function getCurrentUserEmail() {
	const auth = getAuth();

	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			unsubscribe(); // Stop listening to further changes

			if (user) {
				const email = user.email;
				resolve(email);
			} else {
				reject(new Error("User is not signed in."));
			}
		});
	});
}

// Usage
export async function getEmail() {
	try {
		const userEmail = await getCurrentUserEmail();
		console.log(userEmail); // This will log the user's email
		return userEmail; // Return the email
	} catch (error) {
		//   console.error(error.message);
		return null;
	}
}

export async function fetchData(id = "E001") {
	// const docRef = await addDoc(collection(db, "events"), {
	// 	origin: "hmif",
	// 	heading: "JOLLITY: Closing Concert COMMFEST UMN 2023",
	// 	location: "",
	// 	date: "",
	// 	description: "",
	// 	banner_url: ""
	// })

	await setDoc(doc(db, "events", id), {
		origin: "hmif",
		heading: "JOLLITY: Closing Concert COMMFEST UMN 2023",
		location: "Lapangan Universitas Multimedia Nusantara",
		date: "Saturday, Nov 11, 2023 (15.30 WIB - Selesai)",
		description: `Haii haiii, KomZen!

		Udah siap belum nih untuk seru-seruan nonton konser 
		bareng di Jollity: Closing Concert COMMFEST UMN 
		2023?!
		
		Guest Star: @geishaindonesia & @salpriadi
		
		Grab your ticket now at : 
		https://bit.ly/PresaleCOMMFEST2023
		
		Temukan kegembiraan di Jollity COMMFEST 2023
		Instagram: @commfest.umn`,
		banner_url:
			"https://media.discordapp.net/attachments/1054830852783231008/1176751437267615845/image_5.png?ex=6570022d&is=655d8d2d&hm=b89a03a67e4adcc153acff64676d5b12c63aec9442eec7a25cf5851692bf5431&=&format=webp&width=537&height=347",
	});
}

export async function addEvent(
	bannerUrl: string,
	date: string,
	description: string,
	heading: string,
	location: string,
	origin: string
) {
	const eventsCollection = collection(db, "events");

	await addDoc(eventsCollection, {
		origin: origin,
		heading: heading,
		location: location,
		date: date,
		description: description,
		banner_url: bannerUrl,
		// You don't need to specify an ID here, Firestore will auto-generate one
	});
}	

// export const [eventData, setEventData] = useState([]);

// export async function getEvent(origin:string){

// 	const q = query(collection(db, "events"), where("origin","==", origin));

// 	try {
//         const querySnapshot = await getDocs(q);
//         const events:any = [];
//         querySnapshot.forEach((doc) => {
//           // Push each document's data to the events array
//           events.push({ id: doc.id, data: doc.data() });
//         });
//         setEventData(events); // Set the state with retrieved data
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
	  
// }