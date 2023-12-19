import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLoading, IonAlert, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonCard, IonCol, IonGrid, IonRow, IonButtons, IonSelect, IonSelectOption, IonToast } from "@ionic/react";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Organization from "./Organization";
import { arrowBack, arrowBackOutline, pencil } from "ionicons/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addOrganization } from "../firebaseConfig";


const EditOrganization: React.FC = () => {
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

    const handleSubmit = async () => {
        const goback = () => {
            window.history.back();
        }

        if (!name || !category) {
            setShowToastCancel(true);
        } else {
            setLoading(true);
            const organizationRef = doc(getFirestore(), "organizations");
            await updateDoc(organizationRef, {
                name,
                description,
                announcement,
                category,
            });
            if (image) {
                // await addOrganization(id, image);
            }
            setLoading(false);
            setShowToast(true);
            history.push("/organization");
        }
        goback();
    }

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
            <IonHeader>
                <IonToolbar color="linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)"style={{
                    background: "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",

                    height: "80px",
					borderRadius: "0px 0px 32px 32px",
					padding: "10px 25px",
					position: "relative",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                
                }}>
                        <IonButtons style={{ position: "absolute", top:"5px", bottom: "20px"}}>
                            <IonButton style={{ backgroundColor: "#FFFFFF", borderRadius: "100%" }} onClick={goBack}>
                                <IonIcon color="#095797" icon={arrowBackOutline} size="large" />
                            </IonButton>
                        </IonButtons>
                    <IonTitle color="light">Edit Organization</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(true)}
                message="Organization Successfully edited!"
                duration={2000}
            />
            <IonToast
                isOpen={showToastCancel}
                onDidDismiss={() => setShowToastCancel(false)}
                message="Please fill every mandatory fields!"
                duration={2000}
            />
            <IonContent fullscreen>
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
                        <IonIcon icon={pencil} style={{
                            position: "absolute",
                            top: "80px",
                            left: "80px",
                            width: "20px",
                            color: "white",
                        }}></IonIcon>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </IonItem>
                    {/* {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: "100%", maxHeight: "300px", marginTop: "10px" }}
                        />
                    )} */}
                </IonList>

                <IonGrid>
                <div style={{
                    // height:"56px",
                    // marginTop:"10px",
                    // marginBottom:"10px",
                }}>
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
                        value={description}
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
                        label="Announcement"
                        value={announcement}
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
                    <IonSelect 
                        label="Category*"
                        value={category}
                        fill="outline"
                        labelPlacement="floating"
                        id = "category"
                        // style={{left:"5px", borderRadius:"28px", height:"56px"}}
                        placeholder="Select category"
                    >
                        <IonSelectOption value="1">Himpunan</IonSelectOption>
                        <IonSelectOption value="2">UKM</IonSelectOption>
                        <IonSelectOption value="3">Media Kampus</IonSelectOption>
                    </IonSelect>
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

export default EditOrganization;