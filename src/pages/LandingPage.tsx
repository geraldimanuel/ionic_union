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
	IonRouterLink
  } from "@ionic/react";
  import {
	add,
	locationOutline,
	calendarNumberOutline,
  } from "ionicons/icons";
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { useEffect, useState } from "react";
  import { collection, getDocs, query, where, getDoc, doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
  import { useHistory } from "react-router-dom";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { addEvent, db } from "../firebaseConfig";
  
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
  
  interface UserData {
	  id: string;
	  data: {
		email: string;
		event_attended: string[];
		event_declined: string[];
		name: string;
		origin: string;
		profile_picture: string;
		role: string;
	  };
	}
  
  const Home: React.FC = () => {
	const history = useHistory();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [eventData, setEventData] = useState<EventData[]>([]);
	const [userData, setUserData] = useState<UserData[]>([]);
	const [loggedUserEvent, setLoggedUserEvent] = useState<string[]>([]);
	const auth = getAuth();
  
	const handleCardClick = (eventId: string) => {
	  history.push(`events/${eventId}`);
	};
  
	const filteredEvents = eventData.filter((item) =>
	  Object.values(item.data).some(
		(value) =>
		  typeof value === "string" &&
		  value.toLowerCase().includes(searchTerm.toLowerCase())
	  )
	);
  
	useEffect(() => {
	  const q = query(collection(db, "users"), where("email", "==", auth.currentUser?.email));
	
	  const unsubscribe = onSnapshot(q, (querySnapshot) => {
		const users: UserData[] = [];
		querySnapshot.forEach((doc) => {
		  const userData: UserData = {
			id: doc.id,
			data: doc.data() as {
			  email: string;
			  event_attended: string[];
			  event_declined: string[];
			  name: string;
			  origin: string;
			  profile_picture: string;
			  role: string;
			},
		  };
		  users.push(userData);
		});
	
		setUserData(users);
		setLoggedUserEvent(users[0].data.event_attended.concat(users[0].data.event_declined));
	  });
	
	  return () => unsubscribe();
	}, [db]);  
  
	useEffect(() => {
	  async function fetchEventData() {
		const origin = "your_origin_value"; 
		const q = query(collection(db, "events"), where("status", "==", "Public"));
	
		try {
		  const querySnapshot = await getDocs(q);
		  const events : any = [];
		  querySnapshot.forEach((doc) => {
			events.push({ id: doc.id, data: doc.data() });
		  });
	
		  const filteredEvents = events.filter((event : any) => loggedUserEvent.includes(event.id));
	
		  setEventData(filteredEvents);
		} catch (error) {
		  console.error("Error fetching data:", error);
		}
	  }
	
	  fetchEventData();
	}, [loggedUserEvent]); 


	const handleClickEvent = () => {
		history.push(`/nav/createevent`);
	};

	const handleClickOrganization = () => {
		history.push(`/nav/createorganization`);
	};

	// const sortedEventData: EventData[] = eventData
	// 	.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	const formatEventDate = (date: Date) => {
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			month: "short",
			year: "2-digit",
		};
		return date.toLocaleDateString(undefined, options);
	};

	

	if (eventData && eventData.length > 0) return (
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
					<p>Hello, {auth.currentUser?.displayName}!</p>
					<h1
						style={{
							fontSize: "32px",
						}}
					>
						Welcome to <br></br> UNION!
					</h1>
				</IonText>
			</div>

			<IonContent style={{ top: "10px" }} className="ion-padding">
				<IonText>
					<h2 style={{ marginTop: "-5px", marginLeft: "10px" }}>
						Make your own event and organization!
					</h2>
				</IonText>
				<IonGrid>
					<IonCol>
						<a href="/nav/createevent">
							<IonButton
								style={{
									"--background":
										"linear-gradient(90deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
								}}
							>
								<IonIcon icon={add} slot="start" />
								Create Event
							</IonButton>
						</a>
					</IonCol>
					<IonCol>
						<a href="/nav/createorganization">
							<IonButton
								style={{
									"--background":
										"linear-gradient(90deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
								}}
							>
								<IonIcon icon={add} slot="start" />
								Create Org
							</IonButton>
						</a>
					</IonCol>
				</IonGrid>
				<IonText>
					<h2 style={{ marginTop: "10px", marginLeft: "10px" }}>
						Your Upcoming Events
					</h2>
				</IonText>
				{eventData.length > 0 ? (
					eventData.map((event : any) => (
						<IonRouterLink key={event.id} routerLink={`/nav/events/${event.id}`}>
							<IonCard>
								<IonGrid>
									<IonRow>
										<IonCol style={{ backgroundColor: "#D93D3D" }} size="3">
											<h1 style={{ textAlign: "center", color: "white" }}>
												{event.data.date}
											</h1>
										</IonCol>
										<IonCol>
											<IonRow>
												<h3 style={{ marginLeft: "5px" }}>{event.data.heading}</h3>
											</IonRow>
											<IonRow>
												<IonCol size="1">
													<IonIcon icon={calendarNumberOutline}></IonIcon>
												</IonCol>
												<IonCol>
													<small>{event.data.date}</small>
												</IonCol>
											</IonRow>
											<IonRow>
												<IonCol size="1">
													<IonIcon icon={locationOutline}></IonIcon>
												</IonCol>
												<IonCol>
													<small>{event.data.location}</small>
												</IonCol>
											</IonRow>
										</IonCol>
									</IonRow>
								</IonGrid>
							</IonCard>
						</IonRouterLink>
					))
				) : (
					<IonText>
						<p style={{ marginLeft: "10px" }}>
							You haven't attended any events. Explore all events{" "}
							<IonRouterLink
								routerLink="/events"
								style={{ textDecoration: "underline", cursor: "pointer" }}
							>
								here
							</IonRouterLink>
							.
						</p>
					</IonText>
				)}
			</IonContent>
		</IonPage>
	);
};

export default Home;
