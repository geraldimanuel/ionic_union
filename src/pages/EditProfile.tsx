import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLoading, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonIcon, IonSelect, IonList, IonSelectOption, IonTextarea, IonCard } from "@ionic/react";
import { arrowBackOutline, pencil } from "ionicons/icons";
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

    const [currentUser, setCurrentUser] = useState<any>(null);

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

    const [imagePreview, setImagePreview] = useState<string>("");

    const handleImageChange = (event: any) => {
        const image = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
    }

    const handleSubmit = async () => {
        const goback = () => {
            window.history.back();
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        const promises = [];
        setError("");
        setLoading(true);
        
        if (name !== currentUser.displayName) {
            promises.push(updateName(name));
        }

        if (email !== currentUser.email) {
            promises.push(updateEmail(email));
        }

        if (password) {
            promises.push(updatePassword(password));
        }

        Promise.all(promises)


    }



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
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                
                <IonGrid>
                    <IonCard style={{
                        height: "125px",
                        width: "125px",
                        borderRadius: "100%",
                        position: "relative",

                        // display: "flex",
                        // alignItems: "center",
                        // justifyContent: "center",
                    }}>
                        <IonRow className="ion-text-center" >
                            <IonCol style={{
                                borderRadius: "20px",
                                top: "30px",
                                marginLeft: "10px",
                                marginRight: "10px",
                            }}>
                                {imagePreview ? (
                                    <img src={imagePreview} />
                                ) : (
                                    <img src="./images/imkom.png" />
                                )}
                            </IonCol>
                        </IonRow>
                        <IonIcon icon={pencil} style={{
                            position: "absolute",
                            top: "80px",
                            left: "80px",
                            width: "20px",
                            color: "white",
                        }}></IonIcon>

                    </IonCard>
                </IonGrid>
                
                </div>
                <IonGrid>
                <div style={{
                    // height:"56px",
                    // marginTop:"10px",
                    // marginBottom:"10px",
                }}>
                    <IonItem>
                        <IonIcon icon={pencil} style={{
                            position: "absolute",
                            top: "80px",
                            left: "80px",
                            width: "20px",
                            color: "white",
                        }}></IonIcon>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </IonItem>
                    <IonItem style={{
                        left:"5px", 
                        borderRadius:"28px", 
                        height:"56px", 
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        marginTop: "10px",
                        marginBottom: "10px"}}>
                    <IonLabel></IonLabel>
                    <IonInput 
                        label="Name*"
                        value={name}
                        fill="outline"
                        labelPlacement="floating"
                        id = "name"
                        type="text"
                        placeholder="Enter your name"
                    />
                    </IonItem>
                    <IonItem 
                    style={{
                        left:"5px",
                        borderRadius:"28px", 
                        height:"56px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        marginTop: "10px",
                        marginBottom: "10px",
                        }}>
                    <IonLabel></IonLabel>
                    <IonTextarea 
                        label="Description"
                        value={email}
                        fill="outline"
                        labelPlacement="floating"
                        id = "description"
                        placeholder="Enter your description"
                    />
                    </IonItem>
                    <IonItem style={{
                        left:"5px",
                        borderRadius:"28px", 
                        height:"56px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        marginTop: "10px",
                        marginBottom: "10px",
                        
                    }}>
                    <IonLabel></IonLabel>
                    <IonTextarea 
                        label="Password"
                        value={password}
                        fill="outline"
                        labelPlacement="floating"
                        id = "announcement"
                        // style={{left:"5px", borderRadius:"28px", height:"56px"}}
                        placeholder="Enter your announcement"
                    />
                    </IonItem>
                    <IonItem style={{
                        left:"5px",
                        borderRadius:"28px", 
                        height:"56px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}>
                    <IonLabel></IonLabel>
                    <IonTextarea 
                        label="Confirm Password"
                        value={confirmPassword}
                        fill="outline"
                        labelPlacement="floating"
                        id = "events"
                        placeholder="Enter your events"
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
                        '--background': 'linear-gradient(90deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)',
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "30px",
                        marginTop: "30px",
                    }}
                    onClick={handleSubmit}
                >
                    Save
                </IonButton>
                </div>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default EditProfile;
