import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonLoading,
	IonGrid,
	IonRow,
	IonCol,
	IonItem,
	IonLabel,
	IonInput,
	IonButton,
	IonButtons,
	IonIcon,
	IonSelect,
	IonList,
	IonSelectOption,
	IonTextarea,
	IonCard,
	IonAvatar,
} from "@ionic/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { arrowBack, arrowBackOutline, pencil } from "ionicons/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { updateUser, db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Camera, CameraResultType } from "@capacitor/camera";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

defineCustomElements(window);

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

const EditProfile: React.FC = () => {
	const [image, setImage] = useState<File>();
	const [imagePreview, setImagePreview] = useState<string>();
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [fileName, setFileName] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [userData, setUserData] = useState<UserData>();

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>();

	const history = useHistory();

	const goBack = () => {
		window.history.back();
	};

	const auth = getAuth();

	const takePicture = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Uri,
		});

		if (!image || !image.webPath) return;

		// Convert Photo to Blob
		const blob = await fetch(image.webPath).then((res) => res.blob());

		// Create a File object from the Blob
		const file = new File([blob], "image.jpg", {
			type: "image/jpeg",
			lastModified: Date.now(),
		});

		setImagePreview(image.webPath);
		setImage(file);
		// updateData(image.webPath);
	};

	const updateData = async (url: string) => {
		if (name) {
			if (image) {
				const storageRef = ref(storage, "profile_pictures/" + fileName); // Use a folder and a file name

				uploadBytes(storageRef, image as Blob).then((snapshot) => {
					getDownloadURL(storageRef).then((newUrl) => {
						updateUser(name, newUrl, auth.currentUser?.uid);
						history.push(`/nav/profile`);
					});
				});
			} else {
				// If no new image is selected, use the current image URL
				updateUser(name, url, auth.currentUser?.uid);
				history.push(`/nav/profile`);
			}
		} else {
			setError("Please fill in all fields");
		}
	};

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		updateData(imagePreview!);

		// delete old state
		setName("");
		setEmail("");
		setImage(undefined);
		setImagePreview(undefined);
		setFileName("");
		setImageUrl("");
	};

	useEffect(() => {
		const uid = auth.currentUser?.uid;

		if (uid) {
			const q = getDoc(doc(db, "users", uid));

			async function fetchUserName() {
				const docSnap = await q;
				const userName = docSnap.data()?.name;
				const userEmail = docSnap.data()?.email;
				const userPhoto = docSnap.data()?.photoURL;

				setName(userName);
				setEmail(userEmail);
				setImageUrl(userPhoto);
				setImagePreview(userPhoto);
			}

			fetchUserName();
		}
	}, [db]);

	const storage = getStorage();

	return (
		<IonPage>
			<IonHeader>
				<div
					style={{
						background:
							"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
						height: "80px",
						borderRadius: "0px 0px 32px 0px",
						padding: "10px 25px",
						position: "relative",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						display: "grid",
						gridTemplateColumns: "auto 1fr",
						alignItems: "center",
					}}
				>
					<IonButtons onClick={goBack}>
						<IonButton>
							<IonIcon
								icon={arrowBack}
								style={{
									color: "white",
									fontSize: "20px",
								}}
							></IonIcon>
						</IonButton>
					</IonButtons>

					<IonTitle color="light" style={{ textAlign: "center" }}>
						Edit Profile
					</IonTitle>
				</div>
			</IonHeader>
			<IonContent fullscreen>
				{/* <IonLoading isOpen={loading} /> */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<IonGrid>
						{/* <IonCard style={{ */}

						{/* }}> */}
						<IonRow className="ion-text-center">
							<IonCol
								style={{
									borderRadius: "20px",
									top: "10px",
									marginLeft: "10px",
									marginRight: "10px",
								}}
							>
								<IonAvatar
									style={{
										width: "100px",
										height: "100px",
									}}
								>
									{imagePreview && <img src={imagePreview} />}
								</IonAvatar>
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

						{/* </IonCard> */}
					</IonGrid>
				</div>
				<IonGrid>
					<div
						style={
							{
								// height:"56px",
								// marginTop:"10px",
								// marginBottom:"10px",
							}
						}
					>
						<IonItem>
							<IonButton expand="full" onClick={takePicture}>
								Take Picture
							</IonButton>
						</IonItem>

						<IonInput
							label="Name"
							value={name}
							fill="outline"
							labelPlacement="floating"
							id="name"
							placeholder="Enter your name"
							onIonChange={(e) => setName(e.detail.value!)}
						/>

						<IonButton
							expand="block"
							style={{
								borderRadius: "20px",
								display: "flex",
								flexDirection: "column",
								marginLeft: "10px",
								marginRight: "10px",
								"--background":
									"linear-gradient(90deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
								boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
								justifyContent: "center",
								alignItems: "center",
								marginBottom: "30px",
								marginTop: "30px",
							}}
							onClick={submitHandler}
						>
							Save
						</IonButton>
					</div>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default EditProfile;
