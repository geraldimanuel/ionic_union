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
import { useHistory, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addEvent, db } from "../firebaseConfig";

interface EventData {
  id: string;
  data: {
    banner_url: string;
    date: string;
    description: string;
    heading: string;
    location: string;
    origin: string;
    created_by: string;
    category: string;
  };
}

interface OrgData {
  id: string;
  data: {
    logo_url: string;
    origin_name: string;
  };
}

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

const organization = Object.freeze([
  { code: "hmif", name: "HMIF" },
  { code: "umnradio", name: "UMN Radio" },
  { code: "imkom", name: "Im'Kom" },
]);

const storage = getStorage();

const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [orgData, setOrgData] = useState<OrgData[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [location, setLocation] = useState("");

  const [date, setDate] = useState<any>();
  const [category, setCategory] = useState<string[]>([]);
  const [status, setStatus] = useState(true);
  const [origin, setOrigin] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [banner_url, setBanner_url] = useState<string | null>(null);
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [showToastCancel, setShowToastCancel] = useState(false);
  const [fileName, setFileName] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("email", "==", auth.currentUser?.email)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users: UserData[] = [];
      querySnapshot.forEach((doc) => {
        const userData: UserData = {
          id: doc.id,
          data: doc.data() as {
            email: string;
            event_attended: string[];
            event_declined: string[];
            name: string;
            origin: string;
            profile_picture: string;
            role: string;
          },
        };
        users.push(userData);
      });

      setUserData(users);
    });

    return () => unsubscribe();
  }, [db]);

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
          },
        };
        orgs.push(orgData);
      });

      setOrgData(orgs);
    });

    return () => unsubscribe();
  }, [db, eventData]);

  useEffect(() => {
    async function fetchEventData() {
      const origin = "your_origin_value";
      const q = query(collection(db, "events"));

      try {
        const querySnapshot = await getDocs(q);
        const events: any = [];
        querySnapshot.forEach((doc) => {
          events.push({ id: doc.id, data: doc.data() });
        });

        const filteredEvents = events.filter((event: any) =>
          id.includes(event.id)
        );

        setEventData(filteredEvents);
        setHeading(filteredEvents[0].data.heading);
        setLocation(filteredEvents[0].data.location);
        setDescription(filteredEvents[0].data.description);
        setDate(filteredEvents[0].data.date);
        setCategory(filteredEvents[0].data.category);
        setStatus(filteredEvents[0].data.status);
        setOrigin(filteredEvents[0].data.origin);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchEventData();
  }, [db]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setFileName(file.name);

      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const storageRef = ref(storage, fileName);

      if (image) {
        uploadBytes(storageRef, image as Blob).then((snapshot) => {
          getDownloadURL(ref(storage, fileName)).then((url) => {
            setBanner_url(url);
          });
        });
      }

      if (!heading || !location || !date || !category || !status || !origin) {
        setShowToastCancel(true);
        setLoading(false);
        return;
      }

      if (banner_url) {
        const updatedEventData = {
          banner_url,
          heading,
          location,
          date,
          description,
          category,
          status,
          origin,
        };

        const eventDocRef = doc(db, "events", id);
        await updateDoc(eventDocRef, updatedEventData);
      } else {
        const updatedEventData = {
          heading,
          location,
          date,
          description,
          category,
          status,
          origin,
        };

        const eventDocRef = doc(db, "events", id);
        await updateDoc(eventDocRef, updatedEventData);
      }

      setShowToast(true);
      setLoading(false);
    } catch (error) {
      setError("Error updating event: " + error);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    fetchData();
  };

  const goBack = () => {
    window.history.back();
  };

  if (eventData && eventData.length > 0)
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
              Edit Event
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
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
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
                src={eventData[0].data.banner_url}
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
              multiple
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
                <IonSelectOption key={org.id} value={origin}>
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
            onClick={handleSubmit}
          >
            Edit
          </IonButton>
        </IonContent>
      </IonPage>
    );
};

export default EditEvent;
