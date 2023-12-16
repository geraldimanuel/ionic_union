<<<<<<< Updated upstream
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
=======
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonModal, IonPage, IonRow, IonText } from "@ionic/react";
import { query, collection, where, getDocs } from "firebase/firestore";
>>>>>>> Stashed changes
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
<<<<<<< Updated upstream
import { useHistory } from "react-router-dom";
=======
import { calendarClearOutline, chevronForwardOutline, locationOutline, pencilOutline, people, peopleOutline } from "ionicons/icons";
import { Link } from "react-router-dom";

interface User {
    email: string;
    event_attended: string[];
    event_declined: string[];
    name: string;
    origin: string[];
    profile_picture: string;
}

interface OrgData {
	id: string;
	data: {
		logo_url: string;
		description: string;
        announcement: string;
		origin_name: string;
		// Add other properties as per your actual data structure
	};
}
>>>>>>> Stashed changes

interface EventData {
	id: string;
	data: {
		banner_url: string;
		date: string;
		description: string;
		heading: string;
		location: string;
		origin: string;
		// Add other properties as per your actual data structure
	};
}

const Profile: React.FC = () => {
	const history = useHistory();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [eventData, setEventData] = useState<EventData[]>([]);

	const handleCardClick = (eventId: string) => {
		history.push(`/events/1`);
	};

	const filteredEvents = eventData.filter((item) =>
		Object.values(item.data).some(
			(value) =>
				typeof value === "string" &&
				value.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	useEffect(() => {
		async function fetchEventData() {
			const origin = "your_origin_value"; // Replace 'your_origin_value' with the actual value
			const q = query(collection(db, "events"), where("origin", "==", "hmif"));

			try {
				const querySnapshot = await getDocs(q);
				const events: any = [];
				querySnapshot.forEach((doc) => {
					// Push each document's data to the events array
					events.push({ id: doc.id, data: doc.data() });
				});
				setEventData(events); // Set the state with retrieved data
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchEventData();
	}, [db]); // Make sure to specify dependencies or leave it empty if it's a one-time fetch

	// Check if eventData is empty or undefined before accessing its properties

<<<<<<< Updated upstream
	function printData() {
		console.log(eventData);
	}

	return (
		<IonPage style={{ backgroundColor: "DBDBDB" }}>
			{/* Header untuk dicuri */}
			<div
				style={{
					background:
						"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
					height: "261px",
					borderRadius: "0px 0px 32px 32px",
					padding: "10px 25px",
					position: "relative",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				}}
			>
				<div style={{ textAlign: "right", marginTop: "70px" }}></div>
				<IonText color="light">
					<p>Hello, Kesya!</p>
					<h1
						style={{
							fontSize: "32px",
						}}
					>
						Let's find your <br></br> favorite events!
					</h1>
				</IonText>
				<IonItem
					style={{
						top: "30px",
						borderRadius: "28px",
						height: "56px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					}}
				>
					<IonLabel>
						<IonIcon icon={searchOutline} />
					</IonLabel>
					<IonInput
						style={{ left: "5px", borderRadius: "28px", height: "56px" }}
						type="text"
						placeholder="Search here. . ."
						value={searchTerm}
						onIonChange={(e) => setSearchTerm(e.detail.value!)}
					/>
				</IonItem>
			</div>

			<IonContent style={{ top: "40px" }} className="ion-padding"></IonContent>
		</IonPage>
	);
=======
	const [showMyOrganizationsModal, setShowMyOrganizationsModal] = useState(false);
  	const [showMyEventsModal, setShowMyEventsModal] = useState(false);

	const openMyOrganizationsModal = () => setShowMyOrganizationsModal(true);
  	const closeMyOrganizationsModal = () => setShowMyOrganizationsModal(false);

  	const openMyEventsModal = () => setShowMyEventsModal(true);
  	const closeMyEventsModal = () => setShowMyEventsModal(false);

  return (
    <IonPage style={{ backgroundColor: "DBDBDB" }}>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
          height: "231px",
          borderRadius: "0px 0px 32px 32px",
          padding: "10px 25px",
          position: "relative",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "right", marginTop: "70px" }}></div>
        <IonText color="light">
          <p>Hello, Bella!</p>
          <h1
            style={{
              fontSize: "32px",
            }}
          >
            Welcome to <br></br> UNION!
          </h1>
        </IonText>
      </div>

      <IonContent>
            <IonCard 
            style={{ 
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
				paddingBottom: "20px",
            }}
            >
                <IonAvatar style={{ width: "100px", height: "100px", marginTop: "10px" }}>
                    <img src={user.profile_picture} />
                </IonAvatar>

                <h1>{user.name}</h1>
                <h3>{user.email}</h3>
				

        {/* Tombol Edit Profile */}
		<div style={{
			display: "flex",
			flexDirection: 'column',
			alignItems: 'center',
			width: "100%",
			padding: "0px 20px",
			bottom: "10px",

		}}>

		<Link to="/edit-profile">
        <IonButton expand="full">
          <IonIcon icon={pencilOutline} slot="start" />
          Edit Profile
          <IonIcon icon={chevronForwardOutline} slot="end" />
        </IonButton>
		</Link>

		<IonButton expand="full" onClick={openMyOrganizationsModal}>
			<IonIcon icon={peopleOutline} slot="start" />
			My Organizations
			<IonIcon icon={chevronForwardOutline} slot="end" />
		</IonButton>

		<IonButton expand="full" onClick={openMyEventsModal}>
			<IonIcon icon={calendarClearOutline} slot="start" />
			My Events
			<IonIcon icon={chevronForwardOutline} slot="end" />
		</IonButton>
		</div>

		<IonModal isOpen={showMyOrganizationsModal} onDidDismiss={closeMyOrganizationsModal}>
		<h2>My Organization</h2>
		<IonGrid style={{ marginTop: "-20px" }}>
                    {orgData.map((item, index) => (
                        <IonCard
                            key={index}
                        >
                            <IonRow
                                style={{ width: "200px", height: "70px"}} 
                                className="ion-text-center"
                            >
                                <IonCol size="4">
                                    <img src={item.data.logo_url} />
                                </IonCol>
                                <IonCol>
                                    <h3>{item.data.origin_name}</h3>
                                </IonCol>
                            </IonRow>
                        </IonCard>
                    ))}
                </IonGrid> 
			<IonButton onClick={() => setShowMyOrganizationsModal(false)}>
				Close
			</IonButton>
		</IonModal>

		<IonModal isOpen={showMyEventsModal} onDidDismiss={closeMyEventsModal}>
		<div style={{
			display: "flex",
			flexDirection: 'column',
			alignItems: 'center',
			width: "100%",
			padding: "0px 20px",
			bottom: "10px",

		}}>
			<h2>My Events</h2>
			</div>
		<IonGrid style={{ marginTop: "-20px" }}>
					{eventData.map((item, index) => (
						<IonCard
							key={index}
						>
							<IonRow
								style={{ width: "200px", height: "70px"}} 
								className="ion-text-center"
							>
								<IonCol size="4">
									<img src={item.data.banner_url} />
								</IonCol>
								<IonCol>
									<h3>{item.data.heading}</h3>
								</IonCol>
							</IonRow>
						</IonCard>
					))}
				</IonGrid> 
			<IonButton onClick={() => setShowMyEventsModal(false)}>
				Close
			</IonButton>
		</IonModal>

				


		
      
				
				

                {/* <h2>My Organization</h2>
                <IonGrid style={{ marginTop: "-20px" }}>
                    {orgData.map((item, index) => (
                        <IonCard
                            key={index}
                        >
                            <IonRow
                                style={{ width: "200px", height: "70px"}} 
                                className="ion-text-center"
                            >
                                <IonCol size="4">
                                    <img src={item.data.logo_url} />
                                </IonCol>
                                <IonCol>
                                    <h3>{item.data.origin_name}</h3>
                                </IonCol>
                            </IonRow>
                        </IonCard>
                    ))}
                </IonGrid> */}


                
                
            </IonCard>
      </IonContent>
    </IonPage>
  );
>>>>>>> Stashed changes
};

export default Profile;
