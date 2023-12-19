import {
	IonBadge,
	IonButton,
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCol,
	IonContent,
	IonDatetime,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonRow,
	IonText,
} from "@ionic/react";
import {
	calendarClearOutline,
	locationOutline,
	notificationsOutline,
	searchOutline,
	calendarNumberOutline
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { format, parseISO } from "date-fns";
import { getAuth } from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

interface EventData {
	id: string;
	data: {
		banner_url: string;
		date: string;
		description: string;
		heading: string;
		location: string;
		origin: string;
		category: string;
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

const Calendar: React.FC = () => {
	const history = useHistory();
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [eventData, setEventData] = useState<EventData[]>([]);
	const [userData, setUserData] = useState<UserData[]>([]);
	const [loggedUserEvent, setLoggedUserEvent] = useState<string[]>([]);

	useEffect(() => {
		console.log("selectedDate: ", selectedDate);
	}, [selectedDate]);

	const handleCardClick = (eventId: string) => {
		history.push(`/events/1`);
	};

	const dateChanged = (value: any) => {
		let formattedDate = format(parseISO(value), "yyyy-MM-dd");
		setSelectedDate(formattedDate);
	};

	const auth = getAuth();

	const [loggedName, setLoggedName] = useState<string>("");

	useEffect(() => {
		// find user name from database that have uid same as auth.currentUser.uid

		const uid = auth.currentUser?.uid;
		console.log(uid);

		if (uid) {
			const q = getDoc(doc(db, "users", uid));

			async function fetchUserName() {
				const docSnap = await q;
				const userName = docSnap.data()?.name;
				setLoggedName(userName);
			}

			fetchUserName();
		}
	}, [db]);

	useEffect(() => {
		// Fetch events from Firebase based on selectedDate
		const fetchEventsFromFirebase = async () => {
			if (selectedDate !== "") {
				const fetchUserData = async () => {
					try {
						const userQuery = query(
							collection(db, "users"),
							where("email", "==", auth.currentUser?.email)
						);
						const userQuerySnapshot = await getDocs(userQuery);
						const users: UserData[] = [];
		
						userQuerySnapshot.forEach((userDoc) => {
							const userData: UserData = {
								id: userDoc.id,
								data: userDoc.data() as {
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
						if (users.length > 0) {
							const loggedUserEvent = users[0].data.event_attended.concat(
								users[0].data.event_declined
							);
							setLoggedUserEvent(loggedUserEvent);
		
							const eventQuery = query(
								collection(db, "events"),
								where("status", "==", "Public")
							);
							const eventQuerySnapshot = await getDocs(eventQuery);
							const events: any[] = [];
		
							eventQuerySnapshot.forEach((eventDoc) => {
								events.push({ id: eventDoc.id, data: eventDoc.data() });
							});
		
							const filteredEvents = events.filter((event) =>
								loggedUserEvent.includes(event.id)
							);
							setEventData(filteredEvents);
						}
					} catch (error) {
						console.error("Error fetching data:", error);
					}
				};
		
				fetchUserData();
			}
		};

		fetchEventsFromFirebase();
		console.log("eventData: ", eventData);
	}, [selectedDate]);

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
				<IonButton
					color="secondary"
					style={{
						position: "relative",
						top: "45px",
						left: "315px",
						width: "51px",
						height: "51px",
						borderRadius: "14px",
					}}
					slot="end"
				>
					<IonIcon icon={notificationsOutline} />
					<IonBadge
						color="danger"
						style={{
							position: "absolute",
							top: "4px",
							left: "15px",
							width: "5px",
							height: "5px",
							borderRadius: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					></IonBadge>
				</IonButton>
				<IonText color="light">
					<p>Hello, {loggedName}!</p>
					<h1
						style={{
							fontSize: "32px",
						}}
					>
						Let's find your <br></br> timeline on <br></br> calendar!
					</h1>
				</IonText>
			</div>

			<IonContent className="ion-padding">
				<IonCard>
					<IonDatetime
						presentation="date"
						onIonChange={(e) => dateChanged(e.detail.value)}
						// dayValues utk highlight hari yang ada eventnya
					></IonDatetime>
				</IonCard>

				{selectedDate === "" ? (
					<p style={{ textAlign: "center", fontSize: "14px" }}>
						Select a date to see events.
					</p>
				) : (
					eventData.map((event: any) => (
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
											<h3 style={{ marginLeft: "5px" }}>
												{event.data.heading}
											</h3>
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
					))
				)}
			</IonContent>
		</IonPage>
	);
};

export default Calendar;
