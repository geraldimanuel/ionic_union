import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLoading, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";



const EditProfile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const history = useHistory();

    // const { currentUser } = useAuth();

    // useEffect(() => {
    //     if (currentUser) {
    //         setUser(currentUser);
    //         setName(currentUser.displayName);
    //         setEmail(currentUser.email);
    //     }
    //     setLoading(false);
    // }, [currentUser]);

    const handleUpdate = async () => {
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        // const promises = [];
        // setError("");
        // setLoading(true);

        // if (name !== currentUser.displayName) {
        //     promises.push(updateName(name));
        // }

        // if (email !== currentUser.email) {
        //     promises.push(updateEmail(email));
        // }

        // if (password) {
        //     promises.push(updatePassword(password));
        // }

        // Promise.all(promises)
        //     .then(() => {
        //         history.push("/home");
        //     })
        //     .catch((error) => {
        //         setError(error.message);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
    };

    const updateName = (name: string) => {
        // return currentUser.updateProfile({
        //     displayName: name,
        // });
    };

    const updateEmail = (email: string) => {
        // return currentUser.updateEmail(email);
    };

    const updatePassword = (password: string) => {
        // return currentUser.updatePassword(password);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)"style={{
                    background: "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",

                    height: "80px",
					borderRadius: "0px 0px 32px 32px",
					padding: "10px 25px",
					position: "relative",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                
                }}>
                <Link to="/profile">
                        <IonButtons style={{ position: "absolute", top: "10px", marginTop: "10px", bottom: "20px"}}>
                            <IonButton style={{ backgroundColor: "#FFFFFF", borderRadius: "100%" }}>
                                <IonIcon color="#095797" icon={arrowBackOutline} size="large" />
                            </IonButton>
                        </IonButtons>
                        </Link>
                    <IonTitle color="light">Edit Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {/* <IonLoading isOpen={loading} /> */}
                
                <IonGrid>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>  
                    <IonRow>
                        <IonCol>
                            <img
                                src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                alt="profile"
                                style={{
                                    width: "50%",
                                    borderRadius: "100%",
                                    marginTop: "20px",
                                }}
                            />
                        </IonCol>
                    </IonRow>
                    </div>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput
                                    type="text"
                                    value={name}
                                    onIonChange={(event) => setName(event.detail.value!)}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput
                                    type="email"
                                    value={email}
                                    onIonChange={(event) => setEmail(event.detail.value!)}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Password</IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                    onIonChange={(event) => setPassword(event.detail.value!)}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Confirm Password</IonLabel>
                                <IonInput
                                    type="password"
                                    value={confirmPassword}
                                    onIonChange={(event) =>
                                        setConfirmPassword(event.detail.value!)
                                    }
                                />
                            </IonItem>

                            <IonButton expand="block" onClick={handleUpdate} style={{
                                marginTop: "20px",
                            }}>
                                Update
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default EditProfile;
