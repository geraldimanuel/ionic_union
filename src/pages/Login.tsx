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
import { loginUser } from "../firebaseConfig";
import { toast } from "../components/toast";

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function login() {
		const res = await loginUser(username, password);
		console.log(res);
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
				<IonButton onClick={login}>Login</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Login;
