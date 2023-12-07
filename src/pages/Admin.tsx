import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addEvent, db } from "../firebaseConfig";

const Admin: React.FC = () => {
	const [bannerUrl, setBannerUrl] = useState("");
	const [date, setDate] = useState("");
	const [description, setDescription] = useState("");
	const [heading, setHeading] = useState("");
	const [location, setLocation] = useState("");
	const [origin, setOrigin] = useState("");

	const history = useHistory();

	async function checkAdminRole(userUid: string | null) {
		console.log("berhasil jadi checkAdminROle");
		console.log(userUid);

		if (userUid) {
			console.log("berhasil masuk if userUid");
			const userDocRef = doc(db, "users", userUid);
			const userDocSnap = await getDoc(userDocRef);

			console.log(userDocSnap);
			getDoc(userDocRef)
				.then((userDocSnapshot) => {
					if (userDocSnapshot.exists()) {
						const userData = userDocSnapshot.data();
						const userRole = userData?.role;
						console.log(userRole);

						if (userRole !== "admin") {
							history.push("/login");
						}
					} else {
						history.push("/login");
					}
				})
				.catch((error) => {
					console.error("Error checking admin role:", error);
					history.push("/login");
				});
		} else {
			history.push("/login");
		}
	}

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const userUid = user.uid;
				checkAdminRole(userUid);
				console.log("berhasil jadi user");
			} else {
				history.push("/login");
			}
		});

		return () => unsubscribe();
	}, [history]);

	// function addEventFunction() {
	// 	addEvent(bannerUrl, date, description, heading, location, origin);
	// }

	return (
		<IonPage>
			<IonHeader></IonHeader>
			<IonContent className="ion-padding">
				<h1>Admin Page (add event: debuging purpose only)</h1>
				<IonRow>
					<IonItem>
						<IonLabel position="floating">Banner URL</IonLabel>
						<IonInput
							placeholder="Banner URL"
							onIonChange={(e: any) => setBannerUrl(e.target.value)}
						/>
					</IonItem>
					<IonItem>
						<IonLabel position="floating">Date</IonLabel>
						<IonInput
							placeholder="date"
							onIonChange={(e: any) => setDate(e.target.value)}
						/>
					</IonItem>
					<IonItem>
						<IonLabel position="floating">Description</IonLabel>
						<IonInput
							placeholder="Description"
							onIonChange={(e: any) => setDescription(e.target.value)}
						/>
					</IonItem>
					<IonItem>
						<IonLabel position="floating">Heading</IonLabel>
						<IonInput
							placeholder="Heading"
							onIonChange={(e: any) => setHeading(e.target.value)}
						/>
					</IonItem>
					<IonItem>
						<IonLabel position="floating">Location</IonLabel>
						<IonInput
							placeholder="Location"
							onIonChange={(e: any) => setLocation(e.target.value)}
						/>
					</IonItem>
					<IonItem>
						<IonLabel position="floating">Origin</IonLabel>
						<IonInput
							placeholder="Origin"
							onIonChange={(e: any) => setOrigin(e.target.value)}
						/>
					</IonItem>
					{/* <IonButton onClick={addEventFunction}>Add Event!</IonButton> */}
				</IonRow>
			</IonContent>
		</IonPage>
	);
};

export default Admin;
