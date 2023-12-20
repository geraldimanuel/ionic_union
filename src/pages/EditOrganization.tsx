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
	IonLabel,
	IonInput,
	IonTextarea,
	IonButton,
	IonIcon,
	IonCard,
	IonCol,
	IonGrid,
	IonRow,
	IonButtons,
	IonSelect,
	IonSelectOption,
	IonToast,
} from "@ionic/react";
import {
	getFirestore,
	doc,
	getDoc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Organization from "./Organization";
import { arrowBack, arrowBackOutline, pencil } from "ionicons/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addOrganization, db, updateOrganization } from "../firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { set } from "date-fns";

const storage = getStorage();

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

const EditOrganization: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [description, setDescription] = useState("");
	const [announcement, setAnnouncement] = useState("");
	const [name, setName] = useState("");
	const [category, setCategory] = useState<string>("");
	const [status, setStatus] = useState("");
	const [origin, setOrigin] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const history = useHistory();
	const [showToast, setShowToast] = useState(false);
	const [showToastCancel, setShowToastCancel] = useState(false);
	const [fileName, setFileName] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const [organizationData, setOrganizationData] = useState<OrgData>();
	const { id } = useParams<{ id: string }>();

	const goBack = () => {
		window.history.back();
	};

	const updateData = (url: string) => {
		if (name && category.length > 0) {
			updateOrganization(id, url, name, description, announcement, category);
			history.push(`/nav/organization/${id}`);
		} else {
			setShowToastCancel(true);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			setImage(file);
			setFileName(file.name);

			const previewURL = URL.createObjectURL(file);
			setImagePreview(previewURL);
		}
	};

	// const submitHandler = async () => {
	// 	const storageRef = ref(storage, fileName);

	// 	uploadBytes(storageRef, image as Blob).then((snapshot) => {
	// 		getDownloadURL(ref(storage, fileName)).then((url) => {
	// 			// setImageUrl(url);
	// 			// console.log(imageUrl);
	// 			updateData(url);
	// 		});
	// 	});
	// };

	const submitHandler = async () => {
		if (image) {
			const storageRef = ref(storage, fileName);

			uploadBytes(storageRef, image as Blob).then((snapshot) => {
				getDownloadURL(ref(storage, fileName)).then((url) => {
					updateData(url);
				});
			});
		} else {
			// Jika tidak ada gambar yang dipilih, gunakan URL gambar lama
			updateData(imageUrl);
		}
	};

	useEffect(() => {
		async function fetchClickedOrganizationData() {
			const orgRef = doc(db, "organizations", id);

			try {
				const orgSnapshot = await getDoc(orgRef);

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
				setImagePreview(orgData.logo_url);
				setName(orgData.origin_name);
				setDescription(orgData.description);
				setAnnouncement(orgData.announcement);
				setCategory(orgData.type);
				setImageUrl(orgData.logo_url);
				console.log(imageUrl);
			} catch (error) {
				console.log(error);
			}
		}

		fetchClickedOrganizationData();
		console.log(organizationData);
	}, []);

	return (
		<IonPage>
			<IonToast
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
				message="Organization successfully edited!"
				duration={2000}
			/>
			<IonToast
				isOpen={showToastCancel}
				onDidDismiss={() => setShowToastCancel(false)}
				message="Please fill every mandatory fields!"
				duration={2000}
			/>
			<IonContent fullscreen>
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
						Edit Organization
					</IonTitle>
				</div>

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
				<IonList className="ion-padding">
					<IonItem>
						<input type="file" accept="image/*" onChange={handleImageChange} />
					</IonItem>
					{imagePreview && (
						<img
							src={imagePreview}
							alt="Preview"
							style={{ width: "100%", maxHeight: "300px", marginTop: "10px" }}
						/>
					)}
					{!imagePreview && (
						<img
							src={organizationData?.logo_url}
							alt="Preview"
							style={{ width: "100%", maxHeight: "300px", marginTop: "10px" }}
						/>
					)}
					<IonInput
						label="Name*"
						labelPlacement="floating"
						fill="outline"
						placeholder="Enter name"
						value={name}
						onIonChange={(e) => setName(e.detail.value!)}
						style={{ marginTop: "10px" }}
					/>
					<IonTextarea
						label="Description*"
						labelPlacement="floating"
						fill="outline"
						placeholder="Enter description"
						value={description}
						onIonChange={(e) => setDescription(e.detail.value!)}
						style={{ marginTop: "10px" }}
					/>
					<IonInput
						label="Announcement*"
						labelPlacement="floating"
						fill="outline"
						placeholder="Enter announcement"
						value={announcement}
						onIonChange={(e) => setAnnouncement(e.detail.value!)}
						style={{ marginTop: "10px" }}
					/>

					<IonSelect
						label="Category*"
						labelPlacement="floating"
						value={category}
						placeholder="Select category"
						fill="outline"
						multiple
						onIonChange={(e) => setCategory(e.detail.value as string)}
						style={{ marginTop: "10px" }}
					>
						<IonSelectOption value="1">Himpunan</IonSelectOption>
						<IonSelectOption value="2">UKM</IonSelectOption>
						<IonSelectOption value="3">Media Kampus</IonSelectOption>
					</IonSelect>
				</IonList>

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
					}}
					onClick={submitHandler}
				>
					Edit
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default EditOrganization;
