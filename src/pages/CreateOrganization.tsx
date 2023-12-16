import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonSelect,
	IonButtons,
	IonSelectOption,
	IonLoading,
	IonAlert,
	IonList,
	IonItem,
	IonInput,
	IonTextarea,
	IonButton,
	IonIcon,
	IonToast,
} from "@ionic/react";
import { useState } from "react";
import { arrowBack } from "ionicons/icons";
import { addOrganization } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

const CreateOrganization: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [description, setDescription] = useState("");
	const [announcement, setAnnouncement] = useState("");
	const [name, setName] = useState("");
	const [category, setCategory] = useState<string[]>([]);
	const [status, setStatus] = useState("");
	const [origin, setOrigin] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const history = useHistory();
	const [showToast, setShowToast] = useState(false);
	const [showToastCancel, setShowToastCancel] = useState(false);
	const [fileName, setFileName] = useState("");
	const [orgId, setOrgId] = useState("");

	const addData = (url: string) => {
		if (name && category.length > 0) {
			addOrganization(url, name, description, announcement, category);

			history.push("/nav/home");
			setShowToast(true);
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

	const submitHandler = async () => {
		const storageRef = ref(storage, fileName);

		uploadBytes(storageRef, image as Blob).then((snapshot) => {
			getDownloadURL(ref(storage, fileName)).then((url) => {
				addData(url);
			});
		});
	};

	const goBack = () => {
		window.history.back();
	};

	return (
		<IonPage>
			<IonToast
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
				message="Event Successfully created!"
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
						Create Organization
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
					{/* <IonInput
						label="Organization ID"
						labelPlacement="floating"
						fill="outline"
						placeholder="Format: NAME-GEN (ex: HMIF-14)"
						value={orgId}
						onIonChange={(e) => setOrgId(e.detail.value!)}
						style={{ marginTop: "10px" }}
					/> */}
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
						label="Description"
						labelPlacement="floating"
						fill="outline"
						placeholder="Enter description"
						value={description}
						onIonChange={(e) => setDescription(e.detail.value!)}
						style={{ marginTop: "10px" }}
					/>
					<IonTextarea
						label="Announcement"
						labelPlacement="floating"
						fill="outline"
						placeholder="Enter announcement"
						value={description}
						onIonChange={(e) => setAnnouncement(e.detail.value!)}
						style={{ marginTop: "10px" }}
					/>
					<IonSelect
						label="Category*"
						labelPlacement="floating"
						fill="outline"
						value={category}
						placeholder="Select category"
						onIonChange={(e) => setCategory(e.detail.value as string[])}
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
					Create
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default CreateOrganization;
