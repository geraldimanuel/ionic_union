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
	IonToast,
	IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db, registerUser } from "../firebaseConfig";
import { logoGoogle } from "ionicons/icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Register: React.FC = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");

	async function register() {
		console.log(username);
		console.log(password);
		console.log(cpassword);

		if (password !== cpassword) {
			return console.log("Passwords do not match");
		}

		if (username.trim() === "" || password.trim() === "") {
			return console.log("Username and password are required");
		}

		const res = await registerUser(username, password);
	}

	const history = useHistory();

	async function registerUser(email: string, password: string) {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed up
				const user = userCredential.user;

				const userRef = doc(db, "users", user.uid);
				const userSnapshot = await getDoc(userRef);

				if (!userSnapshot.exists()) {
					// User doesn't exist, create a new entry
					await setDoc(userRef, {
						profile_picture: "https://www.w3schools.com/howto/img_avatar.png",
						name: name,
						email: email,
						role: "user",
						origin: ["umn"],
						event_attended: [],
						event_declined: [],
					});
				} else {
					// User already exists
					console.log("User already exists in the database");
				}

				history.push("/login");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setRegisterMessage(errorMessage);
				setShowToast(true);
				// ..
			});
	}

	const [showToast, setShowToast] = useState(false);
	const [registerMessage, setRegisterMessage] = useState("");

	return (
		<IonPage>
			<IonToast
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
				message={registerMessage}
				duration={2000}
			/>
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
							justifyContent: "space-around",
							minWidth: "100%",
						}}
					>
						<h1 style={{ fontSize: "43px", marginBottom: "20px" }}>Register</h1>
						<div style={{ marginBottom: "50px" }}>
							<IonItem>
								<IonLabel position="floating">Full Name</IonLabel>
								<IonInput
									placeholder="Full Name"
									onIonChange={(e: any) => setName(e.target.value)}
								/>
							</IonItem>
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
							<IonItem>
								<IonLabel position="floating">Confirm password</IonLabel>
								<IonInput
									placeholder="Re-type password"
									onIonChange={(e: any) => setCPassword(e.target.value)}
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
								onClick={register}
							>
								<p
									style={{
										padding: "0px",
										margin: "0px",
										fontSize: "14px",
									}}
								>
									Register now
								</p>
							</div>
							<p style={{ textAlign: "center", fontSize: "14px" }}>
								Already have an account? <a href="/login">click here.</a>
							</p>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Register;
