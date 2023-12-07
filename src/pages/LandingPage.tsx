import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
	IonIcon,
	IonTitle,
	IonText,
	IonBadge,
	IonToolbar,
	IonItem,
	IonLabel,
	IonCard,
	IonGrid,
	IonRow,
	IonCol,
} from "@ionic/react";
import {
	notificationsOutline,
	searchOutline,
	calendarClearOutline,
	locationOutline,
	appsOutline,
} from "ionicons/icons";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
    const history = useHistory();

	const handleCardClick = () => {
		history.push(`/createevents`);
	};

	return (
		<IonPage style={{ backgroundColor: "DBDBDB" }}>
			{/* Header untuk dicuri */}
			<div style={{
                background:"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)", 
                height:"261px", 
                borderRadius:"0px 0px 32px 32px",
                padding:"10px 25px",
                position:"relative",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                    <div style={{ textAlign: "right", marginTop:"70px" }}>
                    </div>
				<IonText color="light">
					<p>Hello, Kesya!</p>
					<h1
						style={{
							fontSize: "32px",
						}}
					>
					    Welcome to <br></br> UNION!
					</h1>
				</IonText>
			</div>

			<IonContent style={{ top: "40px" }} className="ion-padding">
				<IonText>
					<h2 style={{ marginTop: "-5px", marginLeft: "10px" }}>
						Your Upcoming Events
					</h2>
				</IonText>
				
                <IonButton onClick={handleCardClick}>
                    Create Events
                </IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Home;
