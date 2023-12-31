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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	query,
	where,
	getDoc,
	doc,
	updateDoc,
	arrayUnion,
	onSnapshot,
} from "firebase/firestore";
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

const Event: React.FC = () => {
	const history = useHistory();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [eventData, setEventData] = useState<EventData[]>([]);
	const [userData, setUserData] = useState<UserData[]>([]);
	const [loggedUserEvent, setLoggedUserEvent] = useState<string[]>([]);
	const auth = getAuth();

	const handleCardClick = (eventId: string) => {
		history.push(`/nav/events/${eventId}`);
	};

	const filteredEvents = eventData.filter((item) =>
		Object.values(item.data).some(
			(value) =>
				typeof value === "string" &&
				value.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	useEffect(() => {
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
						profile_picture: string;
						role: string;
					},
				};
				users.push(userData);
			});

			setUserData(users);
			setLoggedUserEvent(
				users[0].data.event_attended.concat(users[0].data.event_declined)
			);
		});

		return () => unsubscribe();
	}, [db]);

	useEffect(() => {
		async function fetchEventData() {
			const origin = "your_origin_value";
			const q = query(
				collection(db, "events"),
				where("status", "==", "Public")
			);

			try {
				const querySnapshot = await getDocs(q);
				const events: any = [];
				querySnapshot.forEach((doc) => {
					events.push({ id: doc.id, data: doc.data() });
				});

				const filteredEvents = events.filter(
					(event: any) => !loggedUserEvent.includes(event.id)
				);

				setEventData(filteredEvents);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchEventData();
	}, [loggedUserEvent]);

	function printData() {
		console.log(eventData);
	}

	const handleAttendClick = async (eventId: string) => {
		try {
			const userDocRef = doc(db, "users", userData[0].id);

			await updateDoc(userDocRef, {
				event_attended: arrayUnion(eventId),
			});

			setUserData(
				userData.map((user) => ({
					...user,
					data: {
						...user.data,
						event_attended: Array.isArray(user.data.event_attended)
							? user.data.event_attended
							: [user.data.event_attended as string],
					},
				}))
			);
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};

	const handleDeclinedClick = async (eventId: string) => {
		try {
			const userDocRef = doc(db, "users", userData[0].id);

			await updateDoc(userDocRef, {
				event_declined: arrayUnion(eventId),
			});

			setUserData(
				userData.map((user) => ({
					...user,
					data: {
						...user.data,
						event_declined: Array.isArray(user.data.event_declined)
							? user.data.event_declined
							: [user.data.event_declined as string],
					},
				}))
			);
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};

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
					<p>Hello, {loggedName}!</p>
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

			<IonContent style={{ top: "40px" }} className="ion-padding">
				<IonText>
					<h2 style={{ marginTop: "-5px", marginLeft: "10px" }}>
						Popular Events
					</h2>
				</IonText>
				{/* <img style={{ marginLeft: "10px" }} src="../images/hahaha.png" /> */}
				{filteredEvents.map((item, index) => (
					<IonCard
						key={index}
						style={{ borderRadius: "10px", marginTop: "30px" }}
						onClick={() => handleCardClick(item.id)}
					>
						<img
							src={item.data.banner_url}
							style={{
								position: "relative",
								zIndex: "1",
								height: "160px",
								width: "100%",
								objectFit: "cover",
							}}
						/>
						<div
							style={{
								zIndex: "2",
								top: "-150px",
								left: "10px",
								backgroundColor: "#2a93d5",
								height: "22px",
								width: "64px",
								borderRadius: "10px",
								position: "relative",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<IonText
								color="light"
								style={{ textAlign: "center", paddingBottom: "5px" }}
							>
								<small>
									<b>Concert</b>
								</small>
							</IonText>
						</div>
						<div style={{ padding: "0px 10px", marginTop: "-30px" }}>
							<IonText color="dark">
								<h2>{item.data.heading}</h2>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<IonIcon icon={calendarClearOutline} />{" "}
									<small style={{ marginLeft: "10px" }}>{item.data.date}</small>{" "}
									<br></br>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<IonIcon icon={locationOutline} />{" "}
									<small style={{ marginLeft: "10px" }}>
										{item.data.location}
									</small>
								</div>
							</IonText>
							<div
								style={{
									marginTop: "10px",
									display: "flex",
									flexDirection: "row",
									gap: "40px",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: "15px",
								}}
							>
								<IonButton
									color="secondary"
									style={{ borderRadius: "10px", width: "146px" }}
									onClick={() => handleAttendClick(item.id)}
								>
									Attend
								</IonButton>
								<IonButton
									color="danger"
									style={{ borderRadius: "10px", width: "146px" }}
									onClick={() => handleDeclinedClick(item.id)}
								>
									Decline
								</IonButton>
							</div>
						</div>
					</IonCard>
				))}
			</IonContent>
		</IonPage>
	);
};

export default Event;
