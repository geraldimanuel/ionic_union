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
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { db, logoutUser } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import {
	arrowBack,
	calendarClearOutline,
	chevronForwardOutline,
	locationOutline,
	pencilOutline,
	peopleOutline,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { set } from "date-fns";

interface User {
	email: string;
	event_attended: string[];
	event_declined: string[];
	name: string;
	origin: string[];
	profile_picture: string;
}

interface OrgData {
	origin_id: string;
	logo_url: string;
	origin_name: string;
	description: string;
	announcement: string;
	type: string;
	admin: string[];
	member: string[];
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

interface UserData {
	id: string;
	data: {
		email: string;
		event_attended: string[];
		event_declined: string[];
		name: string;
		origin: string;
		photoURL: string;
		role: string;
	};
}

const Profile: React.FC = () => {
	const auth = getAuth();

	const [orgData, setOrgData] = useState<OrgData[]>([]);
	const [userData, setUserData] = useState<UserData[]>([]);
	const [loggedUserEvent, setLoggedUserEvent] = useState<string[]>([]);

	useEffect(() => {
		const q = query(
			collection(db, "organizations"),
			where("members", "array-contains", auth.currentUser?.email)
		);

		async function fetchMyOrganizationData() {
			try {
				const querySnapshot = await getDocs(q);
				const orgData: OrgData[] = [];
				querySnapshot.forEach((doc) => {
					// map one by one
					orgData.push({
						origin_id: doc.id,
						logo_url: doc.data().logo_url,
						origin_name: doc.data().origin_name,
						description: doc.data().description,
						announcement: doc.data().announcement,
						type: doc.data().type,
						admin: doc.data().admin,
						member: doc.data().member,
					});
				});
				setOrgData(orgData);
			} catch (error) {
				console.log(error);
			}
		}

		fetchMyOrganizationData();
	}, [db]);

	const [eventData, setEventData] = useState<EventData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const q = query(
					collection(db, "users"),
					where("email", "==", auth.currentUser?.email)
				);

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
								role: string;
								photoURL: string;
							},
						};
						users.push(userData);
					});

					setUserData(users);
					if (users.length > 0) {
						const loggedUserEvent = users[0].data.event_attended;
						setLoggedUserEvent(loggedUserEvent);
					}
				});

				return () => unsubscribe();
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [db]);

	useEffect(() => {
		console.log("loggedUserEvent: ", loggedUserEvent);
	}, [db]);

	useEffect(() => {
		const fetchEvents = async () => {
			const eventsPromises = loggedUserEvent.map(async (eventId) => {
				const docRef = doc(db, "events", eventId);
				const docSnapshot = await getDoc(docRef);

				if (docSnapshot.exists()) {
					return {
						id: docSnapshot.id,
						data: docSnapshot.data() as {
							banner_url: string;
							date: string;
							description: string;
							heading: string;
							location: string;
							origin: string;
						},
					};
				} else {
					console.log("No such document!");
					return null;
				}
			});

			const fetchedEvents = await Promise.all(eventsPromises);
			const filteredEvents = fetchedEvents.filter(
				(event) => event !== null
			) as EventData[];

			// Check for unique events before adding to state
			const uniqueEvents = filteredEvents.filter(
				(event) =>
					!eventData.some((existingEvent) => existingEvent.id === event.id)
			);

			if (uniqueEvents.length > 0) {
				setEventData((prevEventData) => [...prevEventData, ...uniqueEvents]);
			}
		};

		if (loggedUserEvent.length > 0) {
			fetchEvents();
		}
	}, [db, loggedUserEvent, eventData]);

	const [showMyOrganizationsModal, setShowMyOrganizationsModal] =
		useState(false);
	const [showMyEventsModal, setShowMyEventsModal] = useState(false);

	const openMyOrganizationsModal = () => setShowMyOrganizationsModal(true);
	const closeMyOrganizationsModal = () => setShowMyOrganizationsModal(false);

	const openMyEventsModal = () => setShowMyEventsModal(true);
	const closeMyEventsModal = () => setShowMyEventsModal(false);

	const goBack = () => {
		window.history.back();
	};

	const history = useHistory();

	const handleCardClick = (orgId: string) => {
		history.push(`/nav/organization/${orgId}`);
		setShowMyOrganizationsModal(false);
	};

	const handleCardClickEvent = (orgId: string) => {
		history.push(`/nav/events/${orgId}`);
		setShowMyEventsModal(false);
	};

	const logoutUserHandler = () => {
		logoutUser();
		history.push("/");
	};

	const [loggedName, setLoggedName] = useState<string>("");
	const [loggedEmail, setLoggedEmail] = useState<string>("");
	const [loggedPhoto, setLoggedPhoto] = useState<string>("");

	useEffect(() => {
		// find user name from database that have uid same as auth.currentUser.uid

		const uid = auth.currentUser?.uid;

		if (uid) {
			const q = getDoc(doc(db, "users", uid));

			async function fetchUserName() {
				const docSnap = await q;
				const userName = docSnap.data()?.name;
				const userEmail = docSnap.data()?.email;
				const userPhoto = docSnap.data()?.photoURL;

				setLoggedName(userName);
				setLoggedEmail(userEmail);
				setLoggedPhoto(userPhoto);
			}

			fetchUserName();
		}
	}, [db]);

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
				<IonTitle
					color="light"
					style={{ textAlign: "center" }}
					onClick={() => console.log(loggedUserEvent)}
				>
					My Profile
				</IonTitle>
			</div>

			<IonContent>
				<IonCard
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						paddingBottom: "50px",
					}}
				>
					<IonAvatar
						style={{ width: "100px", height: "100px", marginTop: "10px" }}
					>
						{userData[0]?.data.photoURL ? (
							<img src={userData[0]?.data.photoURL} />
						) : (
							<img
								src="https://www.w3schools.com/howto/img_avatar.png"
								alt="Avatar"
							/>
						)}
					</IonAvatar>

					<h1>{userData[0]?.data.name}</h1>
					<h3>{loggedEmail}</h3>
					<div
						style={{
							// display: "flex",
							// flexDirection: 'column',
							alignItems: "center",
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
						}}
					>
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

						<Link to="/nav/request">
							<IonButton expand="full">
								<IonIcon slot="start" />
								Requests
								<IonIcon slot="end" />
							</IonButton>
						</Link>

						<IonButton
							expand="full"
							onClick={logoutUserHandler}
							color={"danger"}
						>
							Logout
						</IonButton>
					</div>

					<IonModal
						isOpen={showMyOrganizationsModal}
						onDidDismiss={closeMyOrganizationsModal}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								width: "100%",
								padding: "0px 20px",
								bottom: "10px",
							}}
						>
							<h2>My Organization</h2>
						</div>
						<IonGrid style={{ marginTop: "-20px" }}>
							{orgData.map((item, index) => (
								<IonCard
									key={index}
									onClick={() => handleCardClick(item.origin_id)}
								>
									<IonRow
										style={{ width: "200px", height: "70px" }}
										className="ion-text-center"
									>
										<IonCol style={{}} size="4">
											<img src={item.logo_url} />
										</IonCol>

										<IonCol>
											<h3>{item.origin_name}</h3>
										</IonCol>
									</IonRow>
								</IonCard>
							))}
						</IonGrid>
						<IonButton onClick={() => setShowMyOrganizationsModal(false)}>
							Close
						</IonButton>
					</IonModal>

					<IonModal
						isOpen={showMyEventsModal}
						onDidDismiss={closeMyEventsModal}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								width: "100%",
								padding: "0px 20px",
								bottom: "10px",
							}}
						>
							<h2>My Events</h2>
						</div>
						<IonGrid style={{ marginTop: "-20px" }}>
							{eventData.map((item, index) => (
								<IonCard
									key={index}
									onClick={() => handleCardClickEvent(item.id)}
								>
									<IonRow
										style={{ width: "200px", height: "70px" }}
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
