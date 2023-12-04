import {
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonPage,
	IonTabBar,
	IonTabButton,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { Link } from "react-router-dom";
import { bag, albums, home, calendar, people } from "ionicons/icons";

const Home: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Blank</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonHeader collapse="condense">
					<IonToolbar></IonToolbar>
				</IonHeader>
				<Link to={"/login"}>
					<h1>Login</h1>
				</Link>
				<Link to={"/register"}>
					<h1>Register</h1>
				</Link>
			</IonContent>
		</IonPage>
	);
};

export default Home;
