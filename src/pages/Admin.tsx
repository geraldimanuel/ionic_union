import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getEmail } from "../firebaseConfig";

const Admin: React.FC = () => {
	function getUsers() {
		console.log(getEmail());
	}

	return (
		<IonPage>
			<IonHeader></IonHeader>
			<IonContent className="ion-padding">
				<h1>Admin Page</h1>
				<button onClick={getUsers}>get user</button>
			</IonContent>
		</IonPage>
	);
};

export default Admin;
