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
							minHeight: "50%",
							justifyContent: "space-between",
						}}
					>
						<div>
							<h1 style={{ fontSize: "43px" }}>Welcome to UNION</h1>
							<p style={{ fontSize: "15px" }}>
								Lorem ipsum hehehehhe iya gitu bener hahaha makanya login dulu,
								tapi ini udah bisa pak janji banget nih
							</p>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
							}}
						>
							<Link to={"/login"}>
								<div
									style={{
										backgroundColor: "#125488",
										color: "#FFFFFF",
										padding: "15px",
										borderRadius: "20px",
										textAlign: "center",
										fontWeight: "bold",
									}}
								>
									<p
										style={{
											padding: "0px",
											margin: "0px",
											fontSize: "14px",
										}}
									>
										Log in
									</p>
								</div>
							</Link>
							<Link to={"/register"}>
								<div
									style={{
										backgroundColor: "#2a93d5",
										color: "#FFFFFF",
										padding: "15px",
										borderRadius: "20px",
										textAlign: "center",
										fontWeight: "bold",
									}}
								>
									<p
										style={{
											padding: "0px",
											margin: "0px",
											fontSize: "14px",
										}}
									>
										Sign up
									</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
