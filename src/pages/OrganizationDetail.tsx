import {
	IonAvatar,
	IonBadge,
	IonButton,
	IonCard,
	IonCardHeader,
	IonButtons,
	IonCol,
	IonContent,
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
	collection,
	query,
	where,
	doc,
	getDoc,
	getDocs,
} from "firebase/firestore";
import {
	calendarNumberOutline,
	locationOutline,
	notificationsOutline,
	arrowBackOutline,
	searchOutline,
	pencil,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import {} from "firebase/firestore";

interface OrgData {
	origin_id: string;
	logo_url: string;
	origin_name: string;
	description: string;
	announcement: string;
	type: string;
	admin: string[];
	members: string[];
}

interface EventData {
	banner_url: string;
	date: string;
	description: string;
	heading: string;
	location: string;
	origin: string;
	created_by: string;
	category: string;
}

const OrganizationDetail: React.FC = () => {
	const history = useHistory();
	const [organizationData, setOrganizationData] = useState<OrgData>();
	const [eventData, setEventData] = useState<EventData[]>([]);

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		async function fetchClickedOrganizationData() {
			// const orgRef = doc(db, "organizations", id);
			// make ref where document id is equal to id
			const orgRef = doc(db, "organizations", id);

			try {
				const orgSnapshot = await getDoc(orgRef);
				const orgData = orgSnapshot.data() as OrgData;
				setOrganizationData(orgData);

				// console.log(orgData);
			} catch (error) {
				console.log(error);
			}
		}

		fetchClickedOrganizationData();
		console.log(organizationData);
	}, []);

	useEffect(() => {
		async function fetchOrganizationsEvents() {
			// get all events where origin is equal to organization id
			const q = query(collection(db, "events"), where("origin", "==", id));

			try {
				const querySnapshot = await getDocs(q);
				const tempEventData: EventData[] = [];

				querySnapshot.forEach((doc) => {
					const eventData: EventData = {
						banner_url: doc.data().banner_url,
						date: doc.data().date,
						description: doc.data().description,
						heading: doc.data().heading,
						location: doc.data().location,
						origin: doc.data().origin,
						created_by: doc.data().created_by,
						category: doc.data().category,
					};
					tempEventData.push(eventData);
				});

				setEventData(tempEventData);
				// console.log(tempEventData);
				console.log(eventData);
			} catch (error) {
				console.log(error);
			}
		}

		fetchOrganizationsEvents();
	}, []);

	const goBack = () => {
		window.history.back();
	};
	return (
		<IonPage style={{ backgroundColor: "DBDBDB" }}>
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
				<div style={{ padding: "0px 15px" }}>
					<IonButtons
						style={{
							position: "absolute",
							top: "10px",
							marginTop: "10px",
							marginLeft: "-15px",
						}}
					>
						<IonButton
							style={{
								backgroundColor: "#ffffff",
								padding: "5px 0px",
								borderRadius: "100%",
							}}
							onClick={goBack}
						>
							<IonIcon color="primary" icon={arrowBackOutline} size="large" />
						</IonButton>
					</IonButtons>
					<IonButtons
						style={{
							position: "absolute",
							top: "10px",
							marginTop: "10px",
							right: "0px",
						}}
					>
						<IonButton
							style={{
								backgroundColor: "#ffffff",
								padding: "5px 0px",
								borderRadius: "100%",
							}}
						>
							<IonIcon color="primary" icon={searchOutline} size="large" />
						</IonButton>
						<Link to="/editorganization/:id">
							<IonButton
								style={{
									backgroundColor: "#ffffff",
									padding: "5px 0px",
									borderRadius: "100%",
								}}
							>
								<IonIcon color="primary" icon={pencil} size="large" />
							</IonButton>
						</Link>
					</IonButtons>

					<div
						style={{
							position: "absolute",
							marginTop: "130px",
							backgroundColor: "white",
							borderRadius: "20%",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						}}
					>
						<img src="./images/imkom.png" style={{ width: "100px" }} />
					</div>
				</div>
				<IonText color="light">
					<h1
						style={{
							fontSize: "32px",
							marginTop: "190px",
							marginLeft: "150px",
						}}
					>
						I'm Kom
					</h1>
				</IonText>
			</div>

			<IonContent className="ion-padding">
				<h2>Description</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
					malesuada felis in nunc lacinia, non convallis ipsum fermentum. Lorem
					ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada
					felis in nunc lacinia, non convallis ipsum fermentum.
				</p>

				<h2>Announcement</h2>
				<p>HALO BELLA!</p>

				<h2>Events</h2>
				<IonCard>
					<IonGrid>
						<IonRow>
							<IonCol style={{ backgroundColor: "#D93D3D" }} size="3">
								<h1 style={{ textAlign: "center", color: "white" }}>01 Dec</h1>
							</IonCol>
							<IonCol>
								<IonRow>
									<h3 style={{ marginLeft: "5px" }}>Rapat Pleno Desember</h3>
								</IonRow>
								<IonRow>
									<IonCol size="1">
										<IonIcon icon={calendarNumberOutline}></IonIcon>
									</IonCol>
									<IonCol>
										<small>18.00 WIB - Selesai</small>
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol size="1">
										<IonIcon icon={locationOutline}></IonIcon>
									</IonCol>
									<IonCol>
										<small>B0307</small>
									</IonCol>
								</IonRow>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonCard>
				<IonCard>
					<IonGrid>
						<IonRow>
							<IonCol style={{ backgroundColor: "#D93D3D" }} size="3">
								<h1 style={{ textAlign: "center", color: "white" }}>04 Dec</h1>
							</IonCol>
							<IonCol>
								<IonRow>
									<h3 style={{ marginLeft: "5px" }}>Talkshow B-Land 2023</h3>
								</IonRow>
								<IonRow>
									<IonCol size="1">
										<IonIcon icon={calendarNumberOutline}></IonIcon>
									</IonCol>
									<IonCol>
										<small>14.00 - 16.00 WIB</small>
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol size="1">
										<IonIcon icon={locationOutline}></IonIcon>
									</IonCol>
									<IonCol>
										<small>Lecture Hall</small>
									</IonCol>
								</IonRow>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonCard>

				<h2>Members</h2>

				{organizationData?.members.map((member) => {
					return (
						<IonItem lines="none">
							<IonAvatar slot="start">
								<img src="./images/profiles/bella.jpg" />
							</IonAvatar>
							<IonText>
								<p>{member}</p>
							</IonText>
						</IonItem>
					);
				})}
			</IonContent>
		</IonPage>
	);
};

export default OrganizationDetail;
