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

const Register: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");

	function registerUser() {
		console.log(username);
		console.log(password);
		console.log(cpassword);
	}

	return (
		<IonPage>
			<IonHeader></IonHeader>
			<IonContent className="ion-padding">
				<h1>Login</h1>
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
				<IonButton onClick={registerUser}>Register</IonButton>
				<p>
					Already have an account?
					<Link to={"/login"}> Login</Link>
				</p>
			</IonContent>
		</IonPage>
	);
};

export default Register;
