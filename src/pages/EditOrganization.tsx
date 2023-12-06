import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonLoading,
	IonAlert,
	IonList,
	IonItem,
	IonInput,
	IonTextarea,
	IonButton,
	IonIcon,
	IonCard,
	IonCol,
	IonGrid,
	IonRow,
} from "@ionic/react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Organization from "./Organization";
import { arrowBack, pencil } from "ionicons/icons";
import { Link } from "react-router-dom";

const EditOrganization: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [address, setAddress] = useState<string>("");

	// const [organization, setOrganization] = useState<Organization>();

	const { id } = useParams<{ id: string }>();

	const history = useHistory();

	// const { currentUser } = useAuth();

	const db = getFirestore();

	const [loading, setLoading] = useState<boolean>(false);

	const [error, setError] = useState<string>("");

	useEffect(() => {
		const getOrganization = async () => {
			const organizationRef = doc(db, "organizations", id);
			const organizationSnap = await getDoc(organizationRef);
		};
		getOrganization();
	}, [db, id]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const organizationRef = doc(db, "organizations", id);

		const organizationSnap = await getDoc(organizationRef);

		if (organizationSnap.exists()) {
			await updateDoc(organizationRef, {
				name: name,
				description: description,
				email: email,
				phone: phone,
				address: address,
			});
			history.push("/organization");
		} else {
			console.log("No such document!");
		}

		setLoading(false);
	};

	return (
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
					}}
				>
					<Link to="/organization">
						<IonIcon
							icon={arrowBack}
							style={{
								color: "white",
								fontSize: "20px",
							}}
						></IonIcon>
					</Link>

					<IonTitle color="light">Edit Organization</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonLoading isOpen={loading} />
				<IonAlert
					isOpen={!!error}
					message={error}
					buttons={[
						{
							text: "Ok",
							handler: () => {
								setError("");
							},
						},
					]}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<IonGrid>
						<IonCard
							style={{
								height: "100px",
								width: "100px",
							}}
						>
							<IonRow className="ion-text-center">
								<IonCol
									style={{
										borderRadius: "20px",
										top: "20px",
										marginLeft: "10px",
										marginRight: "10px",
									}}
								>
									<img src="./images/imkom.png" />
								</IonCol>
							</IonRow>
							<IonIcon
								icon={pencil}
								style={{
									position: "absolute",
									top: "80px",
									left: "80px",
									width: "20px",
									color: "white",
								}}
							></IonIcon>
						</IonCard>
					</IonGrid>
				</div>
				<IonList>
					<IonItem>
						<IonInput
							label="Name"
							labelPlacement="floating"
							fill="outline"
							placeholder="Enter your name"
							value={name}
						></IonInput>
					</IonItem>
					<IonItem>
						<IonTextarea
							label="Description"
							labelPlacement="floating"
							fill="outline"
							placeholder="Enter your description"
							value={description}
						></IonTextarea>
					</IonItem>

					<IonItem>
						<IonInput
							label="Email"
							labelPlacement="floating"
							fill="outline"
							placeholder="Enter your email"
							value={email}
						></IonInput>
					</IonItem>
					<IonItem>
						<IonInput
							label="Phone"
							labelPlacement="floating"
							fill="outline"
							placeholder="Enter your phone"
							value={phone}
						></IonInput>
					</IonItem>
					<IonItem>
						<IonInput
							label="Address"
							labelPlacement="floating"
							fill="outline"
							placeholder="Enter your address"
							value={address}
						></IonInput>
					</IonItem>
				</IonList>

				<IonButton
					expand="block"
					style={{
						borderRadius: "20px",
						display: "flex",
						flexDirection: "column",
						// width: "100px",

						marginLeft: "10px",
						marginRight: "10px",
						background:
							"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
						boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Save
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default EditOrganization;
