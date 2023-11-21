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

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function loginUser() {
		console.log(username);
		console.log(password);
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
				<IonButton onClick={loginUser}>Login</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Login;
