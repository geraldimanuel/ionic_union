import {
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { auth, db, loginUser, provider } from "../firebaseConfig";
import { toast } from "../components/toast";
import { Link, useHistory } from "react-router-dom";

import { logoGoogle } from "ionicons/icons";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase-admin";

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const history = useHistory();

	async function login() {
		const res = await loginUser(username, password);
		console.log(res);
	}

	async function loginUser(email: string, password: string) {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				const user = userCredential.user;

				history.push("/nav");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.log(errorCode);
				console.log(errorMessage);
			});
	}

	function loginWithGooglePopup() {
		signInWithPopup(auth, provider)
			.then(async (result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential!.accessToken;
				// The signed-in user info.
				const user = result.user;

				const userRef = doc(db, "users", user.uid);
				const userSnapshot = await getDoc(userRef);

				if (!userSnapshot.exists()) {
					// User doesn't exist, create a new entry
					await setDoc(userRef, {
						profile_picture: user.photoURL,
						name: user.displayName,
						email: user.email,
						role: "user",
						origin: ["umn"],
						event_attended: [],
						event_declined: [],
					});
				} else {
					// User already exists
					console.log("User already exists in the database");
				}

				history.push("/nav");
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

	return (
		<IonPage>
			<IonContent>
				<div
					style={{
						background:
							"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
						height: "100%",
					}}
				>
					<div
						style={{
							borderRadius: "40px 40px 0px 0px",
							backgroundColor: "#ffffff",
							position: "absolute",
							bottom: "0px",
							padding: "20px 30px 35px",
							display: "flex",
							flexDirection: "column",
							minHeight: "55%",
							justifyContent: "",
							minWidth: "100%",
						}}
					>
						<h1 style={{ fontSize: "43px", marginBottom: "20px" }}>Sign In</h1>
						<div style={{ marginBottom: "50px" }}>
							<IonItem>
								<IonLabel position="floating">E-mail</IonLabel>
								<IonInput
									placeholder="E-mail"
									onIonChange={(e: any) => setUsername(e.target.value)}
								/>
							</IonItem>
							<IonItem>
								<IonLabel position="floating">Password</IonLabel>
								<IonInput
									placeholder="Password"
									onIonChange={(e: any) => setPassword(e.target.value)}
									type="password"
								/>
							</IonItem>
						</div>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
							}}
						>
							<div
								style={{
									backgroundColor: "#125488",
									color: "#FFFFFF",
									padding: "15px",
									borderRadius: "20px",
									textAlign: "center",
									fontWeight: "bold",
								}}
								onClick={() => loginUser(username, password)}
							>
								<p
									style={{
										padding: "0px",
										margin: "0px",
										fontSize: "14px",
									}}
								>
									Sign in with Email
								</p>
							</div>
						</div>
						<p style={{ textAlign: "center", fontSize: "14px" }}>or</p>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
							}}
						>
							<div
								style={{
									backgroundColor: "#FFFFFF",
									boxShadow:
										"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
									color: "#000000",
									padding: "15px",
									borderRadius: "20px",
									textAlign: "center",
									fontWeight: "bold",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: "10px",
								}}
								onClick={loginWithGooglePopup}
							>
								<p
									style={{
										padding: "0px",
										margin: "0px",
										fontSize: "14px",
									}}
								>
									Sign in with Google
								</p>
								<IonIcon color="primary" icon={logoGoogle} />
							</div>
							<p style={{ textAlign: "center", fontSize: "14px" }}>
								Don't have an account yet?{" "}
								<a href="/register">Register here.</a>
							</p>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Login;
