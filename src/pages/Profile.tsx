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
import { useHistory } from "react-router-dom";

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
};

export default Profile;
