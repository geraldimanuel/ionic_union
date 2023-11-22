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
import { Link } from "react-router-dom";
import { loginWithGooglePopup, registerUser } from "../firebaseConfig";
import { logoGoogle } from "ionicons/icons";

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
			<IonContent>
				{/* <h1>Register</h1>
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

				<button onClick={loginWithGooglePopup}>Sign in With Google</button> */}

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
							justifyContent: "space-around",
							minWidth: "100%",
						}}
					>
						<h1 style={{ fontSize: "43px", marginBottom: "20px" }}>Register</h1>
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
							<IonItem>
								<IonLabel position="floating">Confirm password</IonLabel>
								<IonInput
									placeholder="Re-type password"
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
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Register;
