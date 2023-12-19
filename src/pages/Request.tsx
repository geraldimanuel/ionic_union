import {
	IonAlert,
	IonAvatar,
	IonBadge,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardSubtitle,
	IonCol,
	IonFab,
	IonFabButton,
	IonGrid,
	IonIcon,
	IonInput,
	IonItem,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonLabel,
	IonList,
	IonMenuButton,
	IonModal,
	IonPage,
	IonRow,
	IonText,
	IonThumbnail,
	IonToast,
	isPlatform,
} from "@ionic/react";
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonContent,
	setupIonicReact,
} from "@ionic/react";
import {
	addOutline,
	arrowBack,
	ban,
	banSharp,
	cart,
	checkmark,
	create,
	trash,
} from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { arrowBackOutline } from "ionicons/icons";
import { addMembers, db } from "../firebaseConfig";
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
} from "firebase/firestore";
import { auth } from "firebase-admin";
import { getAuth } from "firebase/auth";

setupIonicReact();

interface RequestData {
	request_id: string;
	origin_id: string;
	email: string;
	origin_name?: string;
	admin?: string;
}

const Request: React.FC = () => {
	const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

	const [toastMessage, setToastMessage] = useState("");
	const [startRejecting, setStartRejecting] = useState(false);
	const [startAccepting, setStartAccepting] = useState(false);
	const [requestData, setRequestData] = useState<RequestData[]>([]);

	const startRejectingHandler = async (id: string) => {
		// delete request data from database

		await deleteDoc(doc(db, "requests", id));

		setStartRejecting(true);
		setToastMessage("Request rejected!");
	};

	const startAcceptingHandler = async (id: string) => {
		// search from id in requests, get email

		const docRef = doc(db, "requests", id);
		const docSnap = await getDoc(docRef);

		const email = docSnap.data()?.email;
		const origin_id = docSnap.data()?.origin_id;

		addMembers(origin_id, email);
		setStartAccepting(true);
		setToastMessage("Request accepted!");
		await deleteDoc(doc(db, "requests", id));
	};

	const auth = getAuth();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "requests"));
				const updatedRequests: RequestData[] = [];

				querySnapshot.forEach((doc) => {
					updatedRequests.push({
						request_id: doc.id,
						origin_id: doc.data().origin_id,
						email: doc.data().email,
					});
				});

				setRequestData(updatedRequests);

				// Fetch additional data for each request
				const requestsWithData = await Promise.all(
					updatedRequests.map(async (data) => {
						const docRef = doc(db, "organizations", data.origin_id);
						const docSnap = await getDoc(docRef);
						const origin_name = docSnap.data()?.origin_name;
						const admin = docSnap.data()?.admin[0];

						return {
							...data,
							origin_name,
							admin,
						};
					})
				);

				setRequestData(requestsWithData);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [db]);

	const goBack = () => {
		window.history.back();
	};

	return (
		<>
			<React.Fragment>
				<IonToast
					isOpen={!!toastMessage}
					message={toastMessage}
					duration={2000}
					onDidDismiss={() => {
						setToastMessage("");
					}}
				/>
			</React.Fragment>
			<IonPage>
				<IonHeader>
					<IonToolbar
						color="linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)"
						style={{
							background:
								"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",

							height: "80px",
							borderRadius: "0px 0px 32px 32px",
							padding: "10px 25px",
							position: "relative",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							marginBottom: "10px",
						}}
					>
						<IonButtons
							style={{ position: "absolute", top: "5px", bottom: "20px" }}
						>
							<IonButton
								style={{ backgroundColor: "#FFFFFF", borderRadius: "100%" }}
								onClick={goBack}
							>
								<IonIcon color="#095797" icon={arrowBackOutline} size="large" />
							</IonButton>
						</IonButtons>
						<IonTitle color="light">Accept Request</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent fullscreen>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
						}}
					>
						<IonCard
							style={{
								width: "100%",
								// height:"100px",
								height: "50px",
								borderRadius: "20px",
								background:
									"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
								boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
								// margin:"10px 10px 10px 10px",
								// padding:"10px 10px 10px 10px",
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								color: "white",
								bottom: "10px",
							}}
						>
							<IonCardContent>
								<IonCardSubtitle
									style={{
										bottom: "8px",
									}}
									color="light"
								>
									{" "}
									Requests
									<IonLabel>
										<IonBadge
											color="danger"
											style={{
												marginLeft: "5px",
												size: "small",
											}}
										>
											{requestData.length ? requestData.length : null}
										</IonBadge>
									</IonLabel>
								</IonCardSubtitle>
							</IonCardContent>
						</IonCard>
					</div>
					{requestData
						.filter((data) => data.admin === auth.currentUser?.email) // Assuming adminEmail holds the admin's email
						.map((data, index) => (
							<IonList key={index}>
								<IonItemSliding key={index} ref={slidingOptionsRef}>
									<IonItem>
										<IonAvatar slot="start">
											<img src="https://www.w3schools.com/howto/img_avatar.png" />
										</IonAvatar>
										<IonLabel>
											<h2>{data.email}</h2>
											<p>Request to join {data.origin_name}</p>
										</IonLabel>
										<IonIcon icon={arrowBack} slot="end" />
									</IonItem>
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<IonItemOptions side="end">
											<IonItemOption
												color="danger"
												onClick={startRejectingHandler.bind(
													null,
													data.request_id
												)}
											>
												<IonIcon slot="icon-only" icon={ban} />
											</IonItemOption>
											<IonItemOption
												color="success"
												onClick={startAcceptingHandler.bind(
													null,
													data.request_id
												)}
											>
												<IonIcon slot="icon-only" icon={checkmark} />
											</IonItemOption>
										</IonItemOptions>
									</div>
								</IonItemSliding>
							</IonList>
						))}
				</IonContent>
			</IonPage>
		</>
	);
};

export default Request;
