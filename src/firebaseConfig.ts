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
	signOut,
} from "firebase/auth";
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
	Timestamp,
	updateDoc,
} from "firebase/firestore";

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
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
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

export async function logoutUser() {
	auth.signOut();
	// go to login page
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

export async function addEvent(
	bannerUrl: string | null,
	heading: string,
	date: Timestamp | null,
	location: string,
	description: string,
	category: string[],
	status: boolean,
	origin: string,
	created_by: string,
) {
	const eventsCollection = collection(db, "events");

	const user = auth.currentUser;
	const username = user?.displayName;

	await addDoc(eventsCollection, {
		origin: origin,
		heading: heading,
		location: location,
		date: date,
		description: description,
		banner_url: bannerUrl,
		category: category,
		status: status,
		created_by: username,
	});
}

export async function addOrganization(
	// origin_id: string,
	logo_url: string | null,
	origin_name: string,
	description: string,
	announcement: string,
	type: string[],
) {

	const organizationsCollection = collection(db, "organizations");
	
	const user = auth.currentUser;
	const email = user?.email;

	await addDoc(organizationsCollection, {
		// origin_id: origin_id,
		logo_url: logo_url,
		origin_name: origin_name,
		description: description,
		announcement: announcement,
		type: type,
		admin: [email],
		members: [email],
	});

	// await setDoc(doc(db, "organizations", origin_id), {
	// 	origin_id: origin_id,
	// 	logo_url: logo_url,
	// 	origin_name: origin_name,
	// 	description: description,
	// 	announcement: announcement,
	// 	type: type,
	// 	admin: [email],
	// 	members: [email],
	// });
}

export async function updateOrganization(
	origin_id: string,
	logo_url: string | null,
	origin_name: string,
	description: string,
	announcement: string,
	type: string,
) {
	
	await updateDoc(doc(db, "organizations", origin_id), {
		logo_url: logo_url,
		origin_name: origin_name,
		description: description,
		announcement: announcement,
		type: type,
	});	

	console.log
}

export async function updateEvent(
	event_id: string,
	bannerUrl: string | null,
	heading: string,
	date: Timestamp | null,
	location: string,
	description: string,
	category: string[],
	status: boolean,
	origin: string,
) {
	const eventsCollection = collection(db, "events");

	await updateDoc(doc(db, "events", event_id), {
		heading: heading,
		location: location,
		date: date,
		description: description,
		banner_url: bannerUrl,
		category: category,
		status: status,
	});
}

export async function updateUser(
	name: string,
	photoURL: string,
	user_uid: any,
) {

	const loggedUserRef = doc(db, "users", user_uid);

	await updateDoc(loggedUserRef, {
		name: name,
		photoURL: photoURL,
	});
}


export async function requestJoinOrganization(
	origin_id: string,
) {

	const user = auth.currentUser;
	const email = user?.email;

	// if same email already request to same organization then do nothing
	const q = query(collection(db, "requests"), where("origin_id", "==", origin_id), where("email", "==", email));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		console.log(doc.id, " => ", doc.data());
	});

	if (querySnapshot.size > 0) {
		console.log("already requested");
		return;
	}

	await addDoc(collection(db, "requests"), {
		origin_id: origin_id,
		email: email,
	});
}


export async function addMembers(
	origin_id: string,
	email: string,
) {
	// append email to members array
	const organizationRef = doc(db, "organizations", origin_id);
	const organizationSnap = await getDoc(organizationRef);

	if (organizationSnap.exists()) {
		console.log("Document data:", organizationSnap.data());
	} else {
		console.log("data ilang bos");
	}

	const organization = organizationSnap.data();
	const members = organization?.members;

	if (members) {
		members.push(email);
	}

	await setDoc(organizationRef, {
		members: members,
	}, { merge: true });

	console.log("Document successfully written!");
}