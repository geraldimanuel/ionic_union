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
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { format, parseISO } from "date-fns";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
		// Add other properties as per your actual data structure
	};
}

const Calendar: React.FC = () => {
	const history = useHistory();
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [eventData, setEventData] = useState<EventData[]>([
		{
			id: "1",
			data: {
				banner_url: "./images/imkom.png",
				date: "2023-12-08",
				description: "join yuk!",
				heading: "imkom",
				location: "function hall",
				origin: "Im'Kom",
			},
		},
		{
			id: "2",
			data: {
				banner_url: "./images/radio.png",
				date: "2023-12-20",
				description: "final stage",
				heading: "umn redio",
				location: "ruang",
				origin: "UMN Radio",
			},
		},
	]);

	useEffect(() => {
		console.log("selectedDate: ", selectedDate);
	}, [selectedDate]);

	const filteredEvents = eventData.filter((item) =>
		Object.values(item.data).some(
			(value) =>
				typeof value === "string" &&
				value.toLowerCase().includes(selectedDate.toLowerCase())
		)
	);

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
					/>
				</IonItem>
			</div>

			<IonContent className="ion-padding">
				<IonCard>
					<IonDatetime
						presentation="date"
						onIonChange={(e) => dateChanged(e.detail.value)}
						// dayValues utk highlight hari yang ada eventnya
					></IonDatetime>
				</IonCard>

				{selectedDate === ""
					? eventData.map((item, index) => (
							<IonCard
								key={index}
								style={{ borderRadius: "10px", marginTop: "30px" }}
								onClick={() => handleCardClick(item.id)}
							>
								<img
									src="../images/cardImage.png"
									style={{ position: "relative", zIndex: "1" }}
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
											<small style={{ marginLeft: "10px" }}>
												{item.data.date}
											</small>{" "}
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
										>
											Attend
										</IonButton>
										<IonButton
											color="danger"
											style={{ borderRadius: "10px", width: "146px" }}
										>
											Decline
										</IonButton>
									</div>
								</div>
							</IonCard>
					  ))
					: filteredEvents.map((item, index) => (
							<IonCard
								key={index}
								style={{ borderRadius: "10px", marginTop: "30px" }}
								onClick={() => handleCardClick(item.id)}
							>
								<img
									src="../images/cardImage.png"
									style={{ position: "relative", zIndex: "1" }}
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
											<small style={{ marginLeft: "10px" }}>
												{item.data.date}
											</small>{" "}
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
										>
											Attend
										</IonButton>
										<IonButton
											color="danger"
											style={{ borderRadius: "10px", width: "146px" }}
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

export default Calendar;
