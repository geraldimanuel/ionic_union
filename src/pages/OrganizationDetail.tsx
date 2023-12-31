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
	calendarNumberOutline,
	locationOutline,
	notificationsOutline,
	arrowBackOutline,
	searchOutline,
} from "ionicons/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
	onSnapshot,
} from "firebase/firestore";
import { db, requestJoinOrganization } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { set } from "date-fns";

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
	event_id: string;
}

interface UserData {
	name: string;
	email: string;
	photo: string;
}

const OrganizationDetail: React.FC = () => {
	const history = useHistory();
	const [organizationData, setOrganizationData] = useState<OrgData>();
	const [eventData, setEventData] = useState<EventData[]>([]);
	const auth = getAuth();
	const [isRequest, setIsRequest] = useState(false);
	const [memberArray, setMemberArray] = useState<string[]>([]);
	const [memberData, setMemberData] = useState<UserData[]>([]);

	const currentUser = auth.currentUser?.email;

	const isMember = organizationData?.members.includes(currentUser!);

	const isAdmin = organizationData?.admin.includes(currentUser!);

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchClickedOrganizationData = () => {
			const orgRef = doc(db, "organizations", id);

			const unsubscribe = onSnapshot(orgRef, (orgSnapshot) => {
				try {
					const orgData: OrgData = {
						origin_id: orgSnapshot.id,
						logo_url: orgSnapshot.data()?.logo_url,
						origin_name: orgSnapshot.data()?.origin_name,
						description: orgSnapshot.data()?.description,
						announcement: orgSnapshot.data()?.announcement,
						type: orgSnapshot.data()?.type,
						admin: orgSnapshot.data()?.admin,
						members: orgSnapshot.data()?.members,
					};
					setOrganizationData(orgData);

					// if (organizationData?.members) {
					// 	const memberPromises = organizationData.members.map(
					// 		async (member) => {
					// 			const docRef = collection(db, "users");
					// 			const q = query(docRef, where("email", "==", member));
					// 			const querySnapshot = await getDocs(q);

					// 			const memberData: any = [];

					// 			querySnapshot.forEach((doc) => {
					// 				const photoURL = doc.data().photoURL;
					// 				const email = doc.data().email;

					// 				if (!memberArray.includes(member)) {
					// 					setMemberArray((prev) => [...prev, member]);
					// 					memberData.push({
					// 						name: member,
					// 						email: email,
					// 						photo: photoURL,
					// 					});
					// 				}
					// 			});

					// 			return memberData;
					// 		}
					// 	);

					// 	if (memberPromises.length > 0) {
					// 		Promise.all(memberPromises)
					// 			.then((results) => {
					// 				const flattenedMemberData = results.flat();
					// 				setMemberData((prev) => [...prev, ...flattenedMemberData]);
					// 			})
					// 			.catch((error) => {
					// 				console.error("Error fetching member data:", error);
					// 			});
					// 	}

					// 	console.log(memberData);
					// }
				} catch (error) {
					console.log(error);
				}
			});

			// Clean up the listener when the component unmounts

			return () => {
				unsubscribe();
			};
		};

		fetchClickedOrganizationData();
	}, [db, id]);

	useEffect(() => {
		const fetchOrganizationsEvents = () => {
			const q = query(collection(db, "events"), where("origin", "==", id));

			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				try {
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
							event_id: doc.id,
						};
						tempEventData.push(eventData);
					});

					setEventData(tempEventData);
				} catch (error) {
					console.log(error);
				}
			});

			// Clean up the listener when the component unmounts
			return () => {
				unsubscribe();
			};
		};

		fetchOrganizationsEvents();
	}, [db, id]);

	function requestHandler() {
		requestJoinOrganization(id);
		setIsRequest(true);
	}

	const goBack = () => {
		window.history.back();
	};
	return (
		<IonPage style={{ backgroundColor: "DBDBDB" }}>
			{/* Header untuk dicuri */}
			<div
				style={{
					background:
						"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
					height: "230px",
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

					{isAdmin && (
						<IonButtons
							style={{
								position: "absolute",
								top: "10px",
								marginTop: "10px",
								right: "0px",
							}}
						>
							<Link to={`/nav/editorganization/${organizationData?.origin_id}`}>
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
					)}

					<div
						style={{
							position: "absolute",
							// marginTop: "130px",
							top: "120px",
							backgroundColor: "white",
							borderRadius: "20%",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							zIndex: 1,
						}}
					>
						<img
							src={organizationData?.logo_url}
							style={{
								width: "100px",
								borderRadius: "20%",
								objectFit: "cover",
								height: "100px",
							}}
						/>
					</div>
				</div>
				<IonText color="light">
					<h1
						style={{
							fontSize: "26px",
							marginTop: "160px",
							marginLeft: "130px",
						}}
					>
						{organizationData?.origin_name}
					</h1>
				</IonText>
			</div>
			{!isMember && !isRequest && (
				<IonButton onClick={requestHandler}>Request to Join</IonButton>
			)}
			<IonContent className="ion-padding">
				<h2>Description</h2>
				<p>{organizationData?.description}</p>

				<h2>Announcement</h2>
				<p>{organizationData?.announcement}</p>

				<h2>Events</h2>

				{eventData.map((event, index) => {
					return (
						<Link
							style={{ textDecoration: "none" }}
							key={index}
							to={`/nav/events/${event.event_id}`}
						>
							<IonCard key={index}>
								<IonGrid>
									<IonRow>
										<IonCol style={{ backgroundColor: "#D93D3D" }} size="3">
											<h1 style={{ textAlign: "center", color: "white" }}>
												{event.date}
											</h1>
										</IonCol>
										<IonCol>
											<IonRow>
												<h3 style={{ marginLeft: "5px" }}>{event.heading}</h3>
											</IonRow>
											<IonRow>
												<IonCol size="1">
													<IonIcon icon={calendarNumberOutline}></IonIcon>
												</IonCol>
												<IonCol>
													<small>{event.date}</small>
												</IonCol>
											</IonRow>
											<IonRow>
												<IonCol size="1">
													<IonIcon icon={locationOutline}></IonIcon>
												</IonCol>
												<IonCol>
													<small>{event.location}</small>
												</IonCol>
											</IonRow>
										</IonCol>
									</IonRow>
								</IonGrid>
							</IonCard>
						</Link>
					);
				})}

				<h2>Members</h2>

				{organizationData?.members.map((member, index) => {
					return (
						<IonItem key={index} lines="none">
							<IonAvatar slot="start">
								<img src="https://www.w3schools.com/howto/img_avatar.png" />
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
