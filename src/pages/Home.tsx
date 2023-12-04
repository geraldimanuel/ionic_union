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
			<IonTabBar color="primary" slot="bottom" className="container" 
				style={{
					borderRadius: "20px",
					position: "floating",
					padding: "10px",
					bottom: "20px",
					marginBottom: "15px",
					marginLeft: "10px",
					marginRight: "10px",

				}}>
                <IonTabButton tab="organization" href="/organization">
                    <IonIcon icon={bag} color="light" size="small"/>
                    <IonText color="light"><b>Organization</b></IonText>
                </IonTabButton>
                <IonTabButton tab="events" href="/events">
                    <IonIcon icon={albums} color="light" size="small"/>
                    <IonText color="light"><b>Events</b></IonText>
                </IonTabButton>
                <IonTabButton tab="home" href="/home" style={{
					
				}}>
                    <IonIcon icon={home} size="large" color="primary" style={{
						backgroundColor: "#fff",
						padding: "10px",
						// background behind icon

						borderRadius: "20px",
						
					}} />
                </IonTabButton>
                <IonTabButton tab="calendar" href="/calendar">
                    <IonIcon icon={calendar} color="light" size="small"/>
                    <IonText color="light"><b>Calendar</b></IonText>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={people} color="light" size="small"/>
                    <IonText color="light"><b>Profile</b></IonText>
                </IonTabButton>
            </IonTabBar>
		</IonPage>
	);
};

export default Home;
