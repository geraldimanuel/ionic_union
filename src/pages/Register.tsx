import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginWithGooglePopup, registerUser } from "../firebaseConfig";

const Register: React.FC = () => {
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

	return (
		<IonPage>
			<IonHeader></IonHeader>
			<IonContent className="ion-padding">
				<h1>Register</h1>
				<IonInput
					placeholder="Email"
					onIonChange={(e: any) => setUsername(e.target.value)}
				/>
				<IonInput
					placeholder="Password"
					onIonChange={(e: any) => setPassword(e.target.value)}
					type="password"
				/>
				<IonInput
					placeholder="Confirm Password"
					onIonChange={(e: any) => setCPassword(e.target.value)}
					type="password"
				/>
				<IonButton onClick={register}>Register</IonButton>
				<p>
					Already have an account?
					<Link to={"/login"}> Login</Link>
				</p>

				<button onClick={loginWithGooglePopup}>Sign in With Google</button>
			</IonContent>
		</IonPage>
	);
};

export default Register;
