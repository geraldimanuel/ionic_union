import {
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonPage,
	IonTabBar,
	IonTabButton,
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
			<div className="" style={{}}>
			<IonTabBar color="primary" slot="bottom" 
				style={{
					borderRadius: "20px",
					position: "floating",
					padding: "10px",
					bottom: "20px",
					marginBottom: "15px",
				}}>
                <IonTabButton tab="organization" href="/organization">
                    <IonIcon icon={bag} color="light" size="small"/>
                    <IonLabel>Organization</IonLabel>
                </IonTabButton>
                <IonTabButton tab="events" href="/events">
                    <IonIcon icon={albums} color="light" size="small"/>
                    <IonLabel>Events</IonLabel>
                </IonTabButton>
                <IonTabButton tab="home" href="/home">
                    <IonIcon icon={home} size="large" style={{
						// backgroundRadius: "30px",
						// backgroundShape: "circle",
						// backgroundColor: "red",
						borderRadius: "15px",
						
					}} />
                </IonTabButton>
                <IonTabButton tab="calendar" href="/calendar">
                    <IonIcon icon={calendar} color="light" size="small"/>
                    <IonLabel>Calendar</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={people} color="light" size="small"/>
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
			</div>
		</IonPage>
	);
};

export default Home;
