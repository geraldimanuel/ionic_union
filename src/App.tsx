import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Admin from "./pages/Admin";
import {
	fetchData,
	firebaseConfig,
	getCurrentUserEmail,
	getEmail,
} from "./firebaseConfig";
import { useEffect, useState } from "react";
import { initializeApp } from "@firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";

setupIonicReact();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App: React.FC = () => {
	const [loggedEmail, setLoggedEmail] = useState<string | null>(null);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const db = getFirestore(app);

	async function checkUser() {
		const q = query(
			collection(db, "users"),
			where("email", "==", loggedEmail as string)
			// where("role", "==", "admin")
		);

		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			console.log("No matching documents.");
		} else {
			console.log("Document data:", querySnapshot.docs[0].data());
			setIsAdmin;
		}
	}

	async function getCurrentUserEmail() {
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

	useEffect(() => {
		// async function fetchData() {
		// 	try {
		// 		const userEmail = await getCurrentUserEmail();
		// 		if (userEmail) {
		// 			setLoggedEmail(userEmail as string);
		// 			// Once the email is obtained, proceed to check if the user is an admin
		// 			await checkUser();
		// 		} else {
		// 			console.log("No user is signed in.");
		// 		}
		// 	} catch (error) {
		// 		console.error("Error fetching user email:", error);
		// 		// Handle error condition
		// 	}
		// }

		// Call the function to start the process
		fetchData();
	}, []); // Empty dependency array ensures this runs only once on mount

	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/admin">
						{isAdmin ? <Admin /> : <Redirect to="/login" />}
					</Route>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
};
export default App;
