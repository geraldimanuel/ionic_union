import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
	IonIcon,
	IonTitle,
	IonText,
	IonBadge,
	IonToolbar,
	IonItem,
	IonLabel,
	IonCard,
	IonGrid,
	IonRow,
	IonCol,
	IonToast,
	IonButtons,
	IonLoading,
	IonList,
	IonSelect,
	IonSelectOption,
	IonTextarea,
	IonAlert,
  } from "@ionic/react";
  import { arrowBack } from "ionicons/icons";
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { useEffect, useState } from "react";
  import {
	collection,
	getDocs,
	query,
	where,
	getDoc,
	doc,
	updateDoc,
	arrayUnion,
	onSnapshot,
  } from "firebase/firestore";
  import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
  import { useHistory, useParams, Link } from "react-router-dom";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { addEvent, db } from "../firebaseConfig";

interface OrgData {
	id: string;
	data: {
	  logo_url: string;
	  origin_name: string;
	  members: string[];
	};
  }

const storage = getStorage();

const CreateEvent: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [description, setDescription] = useState("");
	const [heading, setHeading] = useState("");
	const [location, setLocation] = useState("");
	const [orgData, setOrgData] = useState<OrgData[]>([]);

	const [date, setDate] = useState<any>();
	const [category, setCategory] = useState<string[]>([]);
	const [status, setStatus] = useState(true);
	const [origin, setOrigin] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const history = useHistory();
	const [showToast, setShowToast] = useState(false);
	const [showToastCancel, setShowToastCancel] = useState(false);
	const [fileName, setFileName] = useState("");
	const auth = getAuth();

	useEffect(() => {
		const q = query(collection(db, "organizations"));
	  
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
		  const orgs: OrgData[] = [];
		  querySnapshot.forEach((doc) => {
			const orgData: OrgData = {
			  id: doc.id,
			  data: doc.data() as {
				origin_name: string;
				logo_url: string;
				members: string[];
			  },
			};
	  
			const currentUserEmail = auth.currentUser?.email ?? ''; // Default to an empty string if null or undefined
      if (currentUserEmail && orgData.data.members.includes(currentUserEmail)) {
        orgs.push(orgData);
      }
    });
	  
		  setOrgData(orgs);
		});
	  
		return () => unsubscribe();
	  }, [db, auth.currentUser]);
	  

	const addData = (url: string) => {
		if (heading && location && date && category.length > 0 && image) {
			addEvent(
				url,
				heading,
				date,
				location,
				description,
				category,
				status,
				origin,
				created_by,
			);
			
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

	const [created_by, setCreatedBy] = useState<string>("");

	useEffect(() => {

		const uid = auth.currentUser?.uid;
		console.log(uid);

		if (uid) {
			const q = getDoc(doc(db, "users", uid));

			async function fetchUserName() {
				const docSnap = await q;
				const userName = docSnap.data()?.name;
				setCreatedBy(userName);
			}

			fetchUserName();
		}
	}, [db]);

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
					<Link to="/nav/home">
						<IonButtons>
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
					</Link>

					<IonTitle color="light" style={{ textAlign: "center" }}>
						Create Event
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
					<IonInput
						label="Heading*"
						labelPlacement="floating"
						fill="outline"
						placeholder="Enter heading"
						value={heading}
						onIonChange={(e) => setHeading(e.detail.value!)}
						style={{ marginTop: "10px" }}
					/>
					<IonInput
						label="Location*"
						labelPlacement="floating"
						fill="outline"
						placeholder="Enter location"
						value={location}
						onIonChange={(e) => setLocation(e.detail.value!)}
						style={{ marginTop: "10px" }}
					/>
					<IonInput
						label="Date*"
						labelPlacement="floating"
						fill="outline"
						type="date"
						value={date}
						onIonChange={(e) => setDate(e.detail.value!)}
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
					<IonSelect
						label="Category*"
						labelPlacement="floating"
						value={category}
						placeholder="Select category"
						fill="outline"
						onIonChange={(e) => setCategory(e.detail.value as string[])}
						style={{ marginTop: "10px" }}
					>
						<IonSelectOption value="Concert">Concert</IonSelectOption>
						<IonSelectOption value="Webinar">Webinar</IonSelectOption>
						<IonSelectOption value="Meeting">Meeting</IonSelectOption>
					</IonSelect>

					<IonSelect
						label="Status*"
						labelPlacement="floating"
						value={status}
						fill="outline"
						placeholder="Select status"
						onIonChange={(e) => setStatus(e.detail.value)}
						style={{ marginTop: "10px" }}
					>
						<IonSelectOption value="Public">Public</IonSelectOption>
						<IonSelectOption value="Private">Private</IonSelectOption>
					</IonSelect>

					<IonSelect
						label="Organization*"
						labelPlacement="floating"
						value={origin}
						fill="outline"
						placeholder="Select origin"
						onIonChange={(e) => setOrigin(e.detail.value)}
						style={{ marginTop: "10px" }}
					>
						<IonSelectOption value="0">No Organization</IonSelectOption>
						{orgData.map((org) => (
							<IonSelectOption key={org.id} value={org.id}>
							{org.data.origin_name}
							</IonSelectOption>
						))}
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

export default CreateEvent;
