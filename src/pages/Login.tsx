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
import { loginUser } from "../firebaseConfig";
import { toast } from "../components/toast";
import { Link } from "react-router-dom";

import { logoGoogle } from "ionicons/icons";

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function login() {
		const res = await loginUser(username, password);
		console.log(res);
	}

	return (
		<IonPage>
			<IonContent>
				<div style={{ background: "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)", height: "100%" }}>
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
								onClick={login}
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
								onClick={login}
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
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Login;
