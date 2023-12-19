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

  const updateData = (url: string) => {
    // updateUser(name, url, auth.currentUser?.uid);
    // history.push(`/nav/profile`);

    if (name) {
      updateUser(name, url, auth.currentUser?.uid);
      history.push(`/nav/profile`);
    } else {
      setError("Please fill in all fields");
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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", auth.currentUser?.email)
        );

        const querySnapshot = await getDocs(q);

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

        setUserData(users[0]);

        return () => {
          isMounted = false;
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [db, auth.currentUser?.email]);

  const storage = getStorage();

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
    const auth = getAuth();
    if (auth.currentUser) {
      setName(userData?.data.name!);
      setEmail(auth.currentUser.email!);
      setImageUrl(userData?.data.profile_picture!);
      setLoading(false);
      setImagePreview(userData?.data.profile_picture!);
    }
  }, [userData]);

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
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </IonItem>
            <IonItem
              style={{
                left: "5px",
                borderRadius: "28px",
                height: "56px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <IonLabel></IonLabel>
              <IonInput
                label="Name"
                value={name}
                fill="outline"
                labelPlacement="floating"
                id="name"
                placeholder="Enter your name"
                onIonChange={(e) => setName(e.detail.value!)}
              />
            </IonItem>

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
