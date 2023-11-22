import {
	IonButton,
	IonContent,
	IonFooter,
	IonHeader,
	IonItem,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../firebaseConfig";

const Home: React.FC = () => {
	return (
		<IonPage>
			<IonContent>
				{/* <Link to={"/login"}>
					<h1>Login</h1>
				</Link>
				<Link to={"/register"}>
					<h1>Register</h1>
				</Link>
				<Link to={"/admin"}>
					<h1>Admin</h1>
				</Link>
				<button onClick={logoutUser}>Logout</button> */}
				<div style={{ backgroundColor: "#125488", height: "100%" }}>
					<div
						style={{
							borderRadius: "40px 40px 0px 0px",
							backgroundColor: "#ffffff",
							position: "absolute",
							bottom: "0px",
							padding: "20px 30px 20px",
							display: "flex",
							flexDirection: "column",
							minHeight: "50%",
						}}
					>
						<div>
							<h1>Welcome to UNION</h1>
							<p>
								Lorem ipsum hehehehhe iya gitu bener hahaha makanya login dulu
							</p>
						</div>

						<div>Sign up</div>
						<div>Sign In</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
