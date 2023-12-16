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
					// Push each document's data to the events array
					events.push({ id: doc.id, data: doc.data() });
				});
				setEventData(events); // Set the state with retrieved data
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

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
		console.log(eventData);
	}, [db]);

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
};

export default Profile;
