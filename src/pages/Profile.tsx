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
	IonAvatar,
	IonModal,
} from "@ionic/react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import { arrowBack, calendarClearOutline, chevronForwardOutline, locationOutline, pencilOutline, peopleOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

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
	// const [user, setUser] = useState<User>({
	// 	email: "bellass@gmail.com",
	// 	event_attended: ["imkom", "umnradio"],
	// 	event_declined: [],
	// 	name: "bella",
	// 	origin: ["imkom", "umnradio"],
	// 	profile_picture: "./images/profiles/bella.jpg",
	// });

	const auth = getAuth();
	// const user = auth.currentUser;

	// const [orgData, setOrgData] = useState<OrgData[]>([
	// 	{
	// 		id: "1",
	// 		data: {
	// 			logo_url: "./images/imkom.png",
	// 			description: "Lorem ipsum dolor sit amet",
	// 			announcement: "Lorem ipsum dolor sit amet",
	// 			origin_name: "Im'Kom",
	// 		},
	// 	},
	// 	{
	// 		id: "2",
	// 		data: {
	// 			logo_url: "./images/radio.png",
	// 			description: "Lorem ipsum dolor sit amet",
	// 			announcement: "Lorem ipsum dolor sit amet",
	// 			origin_name: "UMN Radio",
	// 		},
	// 	},
	// ]);
	const [orgData, setOrgData] = useState<OrgData[]>([]);

	useEffect(() => {
		async function fetchOrgData() {
			const origin = "your_origin_value"; // Replace 'your_origin_value' with the actual value
			const getOrgs = query(
				collection(db, "organizations"),
				where("origin", "==", "hmif")
			);

			try {
				const querySnapshot = await getDocs(getOrgs);
				const orgs: any = [];
				querySnapshot.forEach((doc) => {
					orgs.push({ id: doc.id, data: doc.data() });
				});
				setOrgData(orgs);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchOrgData();
	}
	, [db]);


	const [eventData, setEventData] = useState<EventData[]>([]);

	useEffect(() => {
		async function fetchEventData() {
			const origin = "your_origin_value"; // Replace 'your_origin_value' with the actual value
			const getEvents = query(
				collection(db, "events"),
				where("origin", "==", "hmif")
			);

			try {
				const querySnapshot = await getDocs(getEvents);
				const events: any = [];
				querySnapshot.forEach((doc) => {
					events.push({ id: doc.id, data: doc.data() });
				});
				setEventData(events); 
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchEventData();
	}, [db]);
	
	const [showMyOrganizationsModal, setShowMyOrganizationsModal] = useState(false);
  	const [showMyEventsModal, setShowMyEventsModal] = useState(false);

	const openMyOrganizationsModal = () => setShowMyOrganizationsModal(true);
  	const closeMyOrganizationsModal = () => setShowMyOrganizationsModal(false);

  	const openMyEventsModal = () => setShowMyEventsModal(true);
  	const closeMyEventsModal = () => setShowMyEventsModal(false);

	const goBack = () => {
        window.history.back();
    };


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
				paddingBottom: "50px",
            }}
            >
                <IonAvatar style={{ width: "100px", height: "100px", marginTop: "10px" }}>
                    {/* <img src={user.profile_picture} /> */}
					{/* <img src={auth.currentUser?.photoURL} /> */}
                </IonAvatar>

                {/* <h1>{user.name}</h1> */}
                {/* <h3>{user.email}</h3> */}
				<h1>{auth.currentUser?.displayName}</h1>
				<h3>{auth.currentUser?.email}</h3>
			<div style={{
			// display: "flex",
			// flexDirection: 'column',
			alignItems: 'center',
			width: "100%",
			// height: "100%",
			
			display: "grid",
			bottom: "10px",
			marginTop: "20px",
			marginBottom: "5px",
			marginLeft: "20px",
			marginRight: "20px",
			paddingLeft: "20px",
			paddingRight: "20px",
			paddingTop: "20px",

		}}>

		<Link to="/nav/editprofile">
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
		<div style={{
			display: "flex",
			flexDirection: 'column',
			alignItems: 'center',
			width: "100%",
			padding: "0px 20px",
			bottom: "10px",

		}}>
		<h2>My Organization</h2>
		</div>
		<IonGrid style={{ marginTop: "-20px" }}>
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


                
            </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
