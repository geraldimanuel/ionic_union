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

    const handleSubmit = () => {
        if (name && category.length > 0) {
            addOrganization(
                "test",
                imagePreview,
                name,
                description,
                announcement,
                category,
                ["admin"]
            );

            history.push('/home');
            setShowToast(true);
        } else {
            setShowToastCancel(true);
        }
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

    const InputContainer = styled.div`
        position: relative;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    `;
  
    const StyledInput = styled.input`
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        display: flex;
        flex-direction: column;
        
        
        &:focus {
        border-color: #007bff;
        }

        @media (max-width: 768px) {
            font-size: 14px;
        }

        @media (max-width: 480px) {
            font-size: 12px;
        }
    `;

    const Label = styled.label`
        position: absolute;
        top: -10px;
        left: 10px;
        font-size: 14px;
        background-color: #fff;
        padding: 0 5px;
        color: #777;
    `;

    const StyledTextarea = styled.textarea`
        width: 100%;
        min-height: 100px; /* Adjust the height as needed */
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        resize: none; /* Disable textarea resizing */

        &:focus {
            border-color: #007bff;
        }

        @media (max-width: 768px) {
            font-size: 14px;
        }

        @media (max-width: 480px) {
            font-size: 12px;
        }
    `;

    // useEffect(() => {
    //     const getOrganization = async () => {
    //         const organizationRef = doc(db, "organizations", id);
    //         const organizationSnap = await getDoc(organizationRef);
    //     };
    //     getOrganization();
    // }, [db, id]);


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
                        <Link to="/organization">
                        <IonButtons style={{ position: "absolute", top: "10px", marginTop: "10px", bottom: "20px"}}>
                            <IonButton style={{ backgroundColor: "#FFFFFF", borderRadius: "100%" }}>
                                <IonIcon color="#095797" icon={arrowBackOutline} size="large" />
                            </IonButton>
                        </IonButtons>
                        </Link>
                    <IonTitle color="light">Edit Organization</IonTitle>
                </IonToolbar>
            </IonHeader>
            {/* <IonContent fullscreen >
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
                        }}>
                        <IonRow className="ion-text-center" >
                            <IonCol style={{
                                borderRadius: "20px",
                                top: "30px",
                                marginLeft: "10px",
                                marginRight: "10px",
                            
                            }}>
                                <img src="./images/imkom.png" />
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
                <div style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    
                }}>
                
                <IonGrid>
          <IonItem>
            <IonLabel position="floating" style={{
                
            }}>Name</IonLabel>
            <IonInput
              value={name}
              placeholder="Enter your organization's name"
              onIonChange={(e) => setName(e.detail.value!)}
              style={{
            
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea
              value={description}
              placeholder="Enter your description"
              onIonChange={(e) => setDescription(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              placeholder="Enter your email"
              onIonChange={(e) => setEmail(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Phone</IonLabel>
            <IonInput
              type="tel"
              value={phone}
              placeholder="Enter your phone"
              onIonChange={(e) => setPhone(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Address</IonLabel>
            <IonInput
              value={address}
              placeholder="Enter your address"
              onIonChange={(e) => setAddress(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonGrid>

        </div>

        </IonContent> */}
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
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
                {/* <div
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
                </div> */}
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
                        '--background': 'linear-gradient(90deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)',
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
}

export default EditOrganization;

{/* <IonGrid>
                <InputContainer>
                <Label htmlFor="name">Name</Label>
                    <StyledInput
                    type="text"
                    id="name"
                    placeholder="Enter your organization's name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        borderRadius: "20px",
                        display: "flex",
                        flexDirection: "column",
                        // width: "100px",
                        
                        marginLeft: "10px",
                        marginRight: "10px",
                        // boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        justifyContent: "center",
                        alignItems: "center",
                    
                    }}/>
                </InputContainer>
                <InputContainer>
                <Label htmlFor="description">Description</Label>
                    <StyledTextarea
                    
                    id="description"
                    placeholder="Enter your description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                </InputContainer>
                <InputContainer>
                <Label htmlFor="email">Email</Label>
                    <StyledInput
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </InputContainer>
                <InputContainer>
                <Label htmlFor="phone">Phone</Label>
                    <StyledInput
                    type="text"
                    id="phone"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}/>
                </InputContainer>
                <InputContainer>
                <Label htmlFor="address">Address</Label>
                    <StyledInput
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}/>
                </InputContainer> */}