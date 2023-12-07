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
	IonLabel,
	IonInput,
	IonTextarea,
	IonButton,
	IonIcon,
	IonCard,
	IonCol,
	IonGrid,
	IonRow,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { arrowBack, pencil } from "ionicons/icons";
import { Link } from "react-router-dom";
import { addOrganization } from "../firebaseConfig";

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

	const handleSubmit = () => {
		addOrganization(
			"test",
			imagePreview,
			name,
			description,
			announcement,
			category,
			["admin"]
		);

		// belom error handling pasti masih error, image masih belom konek firestore juga
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			setImage(file);

			const previewURL = URL.createObjectURL(file);
			setImagePreview(previewURL);
		}
	};

	const goBack = () => {
		window.history.back();
	};

	return (
		<IonPage>
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
				<IonList>
					<IonItem>
						<input type="file" accept="image/*" onChange={handleImageChange} />
					</IonItem>
					{imagePreview && (
						<IonItem>
							<img
								src={imagePreview}
								alt="Preview"
								style={{ width: "100%", maxHeight: "300px", marginTop: "10px" }}
							/>
						</IonItem>
					)}
					<IonItem>
						<IonInput
							label="name"
							labelPlacement="floating"
							fill="outline"
							placeholder="Enter name"
							value={name}
							onIonChange={(e) => setName(e.detail.value!)}
						/>
					</IonItem>
					<IonItem>
						<IonTextarea
							label="Description"
							labelPlacement="floating"
							fill="outline"
							placeholder="Enter description"
							value={description}
							onIonChange={(e) => setDescription(e.detail.value!)}
						/>
					</IonItem>
					<IonItem>
						<IonTextarea
							label="Announcement"
							labelPlacement="floating"
							fill="outline"
							placeholder="Enter announcement"
							value={description}
							onIonChange={(e) => setAnnouncement(e.detail.value!)}
						/>
					</IonItem>
					<IonItem>
						<IonSelect
							value={category}
							placeholder="Select category"
							onIonChange={(e) => setCategory(e.detail.value as string[])}
						>
							<IonSelectOption value="1">Himpunan</IonSelectOption>
							<IonSelectOption value="2">UKM</IonSelectOption>
							<IonSelectOption value="3">Media Kampus</IonSelectOption>
						</IonSelect>
					</IonItem>
				</IonList>

				<IonButton
					expand="block"
					style={{
						borderRadius: "20px",
						display: "flex",
						flexDirection: "column",
						marginLeft: "10px",
						marginRight: "10px",
						background:
							"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						justifyContent: "center",
						alignItems: "center",
					}}
					onClick={handleSubmit}
				>
					Create
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default CreateOrganization;
