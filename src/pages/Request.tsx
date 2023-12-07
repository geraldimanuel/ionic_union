import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption } from "@ionic/react";
import { doc, getDoc, collection, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { arrowBack } from "ionicons/icons";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { db } from "../firebaseConfig";

const Request: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [slidingoptionsref, setSlidingoptionsref] = useState<any>(null);
    const [organization, setOrganization] = useState<any>(null);
    const [request, setRequest] = useState<any>(null);
    const [requestList, setRequestList] = useState<any>(null);

    const history = useHistory();

    const { id } = useParams<{ id: string }>();

    // const { currentUser } = useAuth();

    // useEffect(() => {
    //     if (currentUser) {
    //         setUser(currentUser);
    //     }
    //     setLoading(false);
    // }, [currentUser]);

    useEffect(() => {
        const getOrganization = async () => {
            const organizationRef = doc(db, "organizations", id);
            const organizationSnap = await getDoc(organizationRef);
            if (organizationSnap.exists()) {
                setOrganization(organizationSnap.data());
            }
        };
        getOrganization();
    }, [id]);

    useEffect(() => {
        const getRequest = async () => {
            const requestRef = collection(db, "organizations", id, "request");
            const requestSnap = await getDocs(requestRef);
            if (requestSnap) {
                setRequestList(requestSnap.docs.map((doc) => doc.data()));
            }
        };
        getRequest();
    }, [id]);

    const handleAccept = async (request: any) => {
        const organizationRef = doc(db, "organizations", id);
        const requestRef = doc(db, "organizations", id, "request", request.id);
        await updateDoc(requestRef, {
            status: "accepted",
        });
        await updateDoc(organizationRef, {
            members: arrayUnion(request.uid),
        });
        setRequestList(requestList.filter((item: any) => item.id !== request.id));
    };

    const handleReject = async (request: any) => {
        const requestRef = doc(db, "organizations", id, "request", request.id);
        await updateDoc(requestRef, {
            status: "rejected",
        });
        setRequestList(requestList.filter((item: any) => item.id !== request.id));
    };

    const handleSlidingoptionsref = (ref: any) => {
        setSlidingoptionsref(ref);
    };

    const handleSlidingoptions = () => {
        if (slidingoptionsref) {
            slidingoptionsref.closeOpened();
        }
    };

    const handleBack = () => {
        history.goBack();
    };
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={handleBack}>
                            <IonIcon icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Request</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {requestList &&
                        requestList.map((request: any) => (
                            <IonItemSliding key={request.id} ref={handleSlidingoptionsref}>
                                <IonItem>
                                    <IonLabel>{request.name}</IonLabel>
                                </IonItem>
                                <IonItemOptions side="end">
                                    <IonItemOption
                                        color="success"
                                        onClick={() => handleAccept(request)}
                                    >
                                        Accept
                                    </IonItemOption>
                                    <IonItemOption
                                        color="danger"
                                        onClick={() => handleReject(request)}
                                    >
                                        Reject
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Request;
function useAuth(): { currentUser: any; } {
    throw new Error("Function not implemented.");
}

