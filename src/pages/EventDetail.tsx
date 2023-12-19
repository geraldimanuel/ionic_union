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
} from "@ionic/react";
import {
  arrowBackOutline,
  settingsOutline,
  calendarClearOutline,
  locationOutline,
  appsOutline,
} from "ionicons/icons";
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

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [orgData, setOrgData] = useState<OrgData[]>([]);
  const [orgThisData, setOrgThisData] = useState<OrgData[]>([]);
  const [loggedUserEvent, setLoggedUserEvent] = useState<string[]>([]);
  const [isIdInLoggedUserEvent, setIsIdInLoggedUserEvent] =
    useState<boolean>(false);
  const [isCurrentUserEventCreator, setIsCurrentUserEventCreator] =
    useState<boolean>(false);
  const auth = getAuth();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      setLoggedUserEvent(
        users[0].data.event_attended.concat(users[0].data.event_declined)
      );
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
    if (userData && userData.length > 0 && id) {
      setIsIdInLoggedUserEvent(loggedUserEvent.includes(id));
    } else {
      setIsIdInLoggedUserEvent(false);
    }
  }, [userData, id]);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchEventData();
  }, [loggedUserEvent]);

  useEffect(() => {
    if (eventData && eventData.length > 0) {
      const filteredOrgData = orgData.filter(
        (org) => org.id === eventData[0].data.origin
      );
      setOrgThisData(filteredOrgData);
      const createdBy = eventData[0].data.created_by;
      setIsCurrentUserEventCreator(createdBy === auth.currentUser?.displayName);
    } else {
      setIsCurrentUserEventCreator(false);
    }
  }, [eventData, orgData]);

  const goBack = () => {
    window.history.back();
  };

  const handleSettingsClick = () => {
    history.push(`/nav/editevent/${id}`);
  };

  const handleAttendClick = async (eventId: string) => {
    try {
      const userDocRef = doc(db, "users", userData[0].id);
  
      await updateDoc(userDocRef, {
        event_attended: arrayUnion(eventId),
      });
  
      setUserData(userData.map(user => ({
        ...user,
        data: {
          ...user.data,
          event_attended: Array.isArray(user.data.event_attended)
            ? user.data.event_attended
            : [user.data.event_attended as string],
        },
      }))); 

      setToastMessage("You confirmed to attend this event");   
  
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  
  const handleDeclinedClick = async (eventId: string) => {
    try {
      const userDocRef = doc(db, "users", userData[0].id);
  
      await updateDoc(userDocRef, {
        event_declined: arrayUnion(eventId),
      });
  
      setUserData(userData.map(user => ({
        ...user,
        data: {
          ...user.data,
          event_declined: Array.isArray(user.data.event_declined)
            ? user.data.event_declined
            : [user.data.event_declined as string],
        },
      })));     
      
      setToastMessage("You confirmed you can't attend this event");
  
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (eventData && eventData.length > 0)
    return (
      <IonPage>
        <IonContent fullscreen>
          <div style={{ width: "100%", height: "300px" }}>
            <div style={{ position: "relative" }}>
              <img
                src={eventData[0].data.banner_url}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(0deg, rgba(18,84,136,1) 0%, rgba(55,202,236,0) 100%)",
                }}
              ></div>
            </div>
            <div
              style={{
                position: "absolute",
                top: 10,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0px 15px",
                boxSizing: "border-box",
              }}
            >
              <IonButtons style={{ marginTop: "10px" }}>
                <IonButton
                  style={{
                    backgroundColor: "#095797",
                    padding: "5px 0px",
                    borderRadius: "100%",
                  }}
                  onClick={goBack}
                >
                  <IonIcon color="light" icon={arrowBackOutline} size="large" />
                </IonButton>
              </IonButtons>

              {isCurrentUserEventCreator && (
                <IonButtons>
                  <IonButton
                    style={{
                      backgroundColor: "#095797",
                      padding: "5px 0px",
                      borderRadius: "100%",
                    }}
                    onClick={handleSettingsClick}
                  >
                    <IonIcon
                      color="light"
                      icon={settingsOutline}
                      size="large"
                    />
                  </IonButton>
                </IonButtons>
              )}
            </div>
            <div
              style={{
                position: "absolute",
                top: "160px",
                left: "25px",
                zIndex: "2",
                backgroundColor: "#2A93D5",
                width: "59px",
                height: "18px",
                borderRadius: "21px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <IonText color="light" className="ion-text-center">
                <p className="small">
                  <b>{eventData[0].data.category}</b>
                </p>
              </IonText>
            </div>
            <div
              style={{
                width: "100%",
                zIndex: "2",
                padding: "10px 25px",
                position: "absolute",
                top: "30px",
                marginTop: "130px",
              }}
            >
              <IonText color="light">
                <h1>{eventData[0].data.heading}</h1>
              </IonText>
            </div>
          </div>
          <div style={{ padding: "0px 25px", marginTop: "-50px" }}>
            <IonText>
              <p>Organizations: </p>
            </IonText>
            <IonGrid style={{ display: "flex" }}>
              <IonRow className="ion-align-items-center ion-justify-content-center">
                {orgThisData.length > 0 && (
                  <img
                    src={orgThisData[0].data.logo_url}
                    alt="Organization Logo"
                    width={60}
                    height={60}
                    style={{ borderRadius: "100%" }}
                  />
                )}
                <IonText style={{ marginLeft: "10px" }}>
                  <p>{eventData[0].data.origin}</p>
                </IonText>
              </IonRow>
            </IonGrid>
            <IonText color="dark">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <IonIcon icon={calendarClearOutline} />{" "}
                <small style={{ marginLeft: "10px" }}>
                  {eventData[0].data.date}
                </small>{" "}
                <br></br>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IonIcon icon={locationOutline} />{" "}
                <small style={{ marginLeft: "10px" }}>
                  {eventData[0].data.location}
                </small>
              </div>
            </IonText>
            <IonText>
              <p style={{ textAlign: "justify", marginTop: "20px" }}>
                {eventData[0].data.description}
              </p>
            </IonText>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
              }}
            >
              {!isIdInLoggedUserEvent ? (
                <>
                  <IonButton
                    color="secondary"
                    style={{ borderRadius: "10px", width: "146px" }}
                    onClick={() => handleAttendClick(id)}
                  >
                    Attend
                  </IonButton>
                  <IonButton
                    color="danger"
                    style={{ borderRadius: "10px", width: "146px" }}
                    onClick={() => handleDeclinedClick(id)}
                  >
                    Decline
                  </IonButton>
                </>
              ) : (
                <p>
                  You already confirmed your attendance or declined this event.
                  This event will shown on your home if you confirmed to attend.
                </p>
              )}
            </div>
          </div>
        </IonContent>
        <IonToast
          isOpen={!!toastMessage}
          onDidDismiss={() => setToastMessage(null)}
          message={toastMessage || ""}
          duration={2000}
        />
      </IonPage>
    );
};

export default EventDetail;
