<<<<<<< Updated upstream
<<<<<<< HEAD
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
=======
import { IonAvatar, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonModal, IonPage, IonRow, IonText, IonTitle } from "@ionic/react";
>>>>>>> Stashed changes
import { query, collection, where, getDocs } from "firebase/firestore";
>>>>>>> Stashed changes
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { useHistory } from "react-router-dom";
=======
import { calendarClearOutline, chevronForwardOutline, locationOutline, pencilOutline, people, peopleOutline } from "ionicons/icons";
=======
import { arrowBack, calendarClearOutline, chevronForwardOutline, locationOutline, pencilOutline, peopleOutline } from "ionicons/icons";
>>>>>>> Stashed changes
import { Link } from "react-router-dom";

interface User {
    email: string;
    event_attended: string[];
    event_declined: string[];
    name: string;
    origin: string[];
    profile_picture: string;
=======
import {
	IonAvatar,
	IonButton,
	IonCard,
	IonCol,
	IonContent,
	IonGrid,
	IonIcon,
	IonPage,
	IonRow,
	IonText,
} from "@ionic/react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { calendarClearOutline, locationOutline } from "ionicons/icons";

interface User {
	email: string;
	event_attended: string[];
	event_declined: string[];
	name: string;
	origin: string[];
	profile_picture: string;
>>>>>>> features/frontend/kesya
}

interface OrgData {
	id: string;
	data: {
		logo_url: string;
		description: string;
<<<<<<< HEAD
        announcement: string;
=======
		announcement: string;
>>>>>>> features/frontend/kesya
		origin_name: string;
		// Add other properties as per your actual data structure
	};
}
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> features/frontend/kesya

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
<<<<<<< HEAD
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

=======
	const [user, setUser] = useState<User>({
		email: "bellass@gmail.com",
		event_attended: ["imkom", "umnradio"],
		event_declined: [],
		name: "bella",
		origin: ["imkom", "umnradio"],
		profile_picture: "./images/profiles/bella.jpg",
	});
	const [orgData, setOrgData] = useState<OrgData[]>([
		{
			id: "1",
			data: {
				logo_url: "./images/imkom.png",
				description: "Lorem ipsum dolor sit amet",
				announcement: "Lorem ipsum dolor sit amet",
				origin_name: "Im'Kom",
			},
		},
		{
			id: "2",
			data: {
				logo_url: "./images/radio.png",
				description: "Lorem ipsum dolor sit amet",
				announcement: "Lorem ipsum dolor sit amet",
				origin_name: "UMN Radio",
			},
		},
	]);
	const [eventData, setEventData] = useState<EventData[]>([]);

>>>>>>> features/frontend/kesya
	useEffect(() => {
		async function fetchEventData() {
			const origin = "your_origin_value"; // Replace 'your_origin_value' with the actual value
			const getEvents = query(
				collection(db, "events"),
				where("origin", "==", "hmif")
			);

			try {
<<<<<<< HEAD
				const querySnapshot = await getDocs(q);
=======
				const querySnapshot = await getDocs(getEvents);
>>>>>>> features/frontend/kesya
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

<<<<<<< HEAD
		fetchEventData();
	}, [db]); // Make sure to specify dependencies or leave it empty if it's a one-time fetch

	// Check if eventData is empty or undefined before accessing its properties

<<<<<<< Updated upstream
	function printData() {
=======
		async function fetchOrganizationData() {
			const origin = "your_origin_value"; // Replace 'your_origin_value' with the actual value
			const getOrgs = query(
				collection(db, "organizations"),
				where("origin", "==", "hmif")
			);

			try {
				const querySnapshot = await getDocs(getOrgs);
				const orgs: any = [];
				querySnapshot.forEach((doc) => {
					// Push each document's data to the events array
					orgs.push({ id: doc.id, data: doc.data() });
				});
				setOrgData(orgs); // Set the state with retrieved data
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchEventData();
		// fetchOrganizationData(); masih kosong

		console.log(orgData);
>>>>>>> features/frontend/kesya
		console.log(eventData);
	}, [db]);

<<<<<<< Updated upstream
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
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<IonAvatar
						style={{ width: "100px", height: "100px", marginTop: "10px" }}
					>
						<img src={user.profile_picture} />
					</IonAvatar>

					<h1>{user.name}</h1>
					<h3>{user.email}</h3>

					<h2>My Organization</h2>
					<IonGrid style={{ marginTop: "-20px" }}>
						{orgData.map((item, index) => (
							<IonCard key={index}>
								<IonRow
									style={{ width: "200px", height: "70px" }}
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

					<h2 style={{ marginTop: "-10px" }}>My Events</h2>
					<IonGrid style={{ marginTop: "-20px" }}>
						{eventData.map((item, index) => (
							<IonCard key={index} style={{ width: "200px", padding: "10px" }}>
								<IonRow>
									<img src="./images/cardImage.png" />
								</IonRow>
								<IonRow className="ion-text-center">
									<h3 style={{ width: "200px" }}>{item.data.heading}</h3>
								</IonRow>
								<IonRow
									style={{ marginTop: "-20px" }}
									className="ion-text-center"
								>
									<IonCol size="5">
										<IonIcon
											style={{ marginTop: "17px" }}
											size="small"
											icon={calendarClearOutline}
										/>
									</IonCol>
									<IonCol style={{ marginLeft: "-50px" }}>
										<h3>{item.data.date}</h3>
									</IonCol>
								</IonRow>
							</IonCard>
						))}
					</IonGrid>
				</IonCard>
			</IonContent>
		</IonPage>
	);
<<<<<<< HEAD
=======
=======
>>>>>>> Stashed changes
	const [showMyOrganizationsModal, setShowMyOrganizationsModal] = useState(false);
  	const [showMyEventsModal, setShowMyEventsModal] = useState(false);

	const openMyOrganizationsModal = () => setShowMyOrganizationsModal(true);
  	const closeMyOrganizationsModal = () => setShowMyOrganizationsModal(false);

  	const openMyEventsModal = () => setShowMyEventsModal(true);
  	const closeMyEventsModal = () => setShowMyEventsModal(false);

<<<<<<< Updated upstream
=======
	const goBack = () => {
        window.history.back();
    };


>>>>>>> Stashed changes
  return (
    <IonPage style={{ backgroundColor: "DBDBDB" }}>
      <div
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
                        height: "80px",
                        borderRadius: "0px 0px 32px 0px",
                        padding: "10px 25px",
                        position: "relative",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        alignItems: "center",
                    }}
                >

                    <IonTitle color="light" style={{ textAlign: "center" }}>
                        My Profile
                    </IonTitle>
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
<<<<<<< Updated upstream
				

        {/* Tombol Edit Profile */}
		<div style={{
			display: "flex",
			flexDirection: 'column',
			alignItems: 'center',
			width: "100%",
			padding: "0px 20px",
			bottom: "10px",

=======
			<div style={{
			// display: "flex",
			// flexDirection: 'column',
			alignItems: 'center',
			width: "100%",
			// height: "100%",
			
			bottom: "20px",
			paddingBottom: "10px",

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
		<div style={{
			display: "flex",
			flexDirection: 'column',
			alignItems: 'center',
			width: "100%",
			padding: "0px 20px",
			bottom: "10px",

		}}>
<<<<<<< Updated upstream
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
=======
		<h2>My Organization</h2>
		</div>
		<IonGrid style={{ marginTop: "-20px" }}>
>>>>>>> Stashed changes
                    {orgData.map((item, index) => (
                        <IonCard
                            key={index}
                        >
                            <IonRow
                                style={{ width: "200px", height: "70px"}} 
                                className="ion-text-center"
                            >
                                <IonCol style={{

								}}size="4">
                                    <img src={item.data.logo_url} />
                                </IonCol>

                                <IonCol>
                                    <h3>{item.data.origin_name}</h3>
                                </IonCol>
                            </IonRow>
                        </IonCard>
                    ))}
<<<<<<< Updated upstream
                </IonGrid> */}


                
=======
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


>>>>>>> Stashed changes
                
            </IonCard>
      </IonContent>
    </IonPage>
  );
>>>>>>> Stashed changes
=======
>>>>>>> features/frontend/kesya
};

export default Profile;
