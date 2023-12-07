import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLoading, IonAlert, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonCard, IonCol, IonGrid, IonRow, IonButtons } from "@ionic/react";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Organization from "./Organization";
import { arrowBack, arrowBackOutline, pencil } from "ionicons/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";


const EditOrganization: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    // const [organization, setOrganization] = useState<Organization>();

    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    // const { currentUser } = useAuth();

    const db = getFirestore();

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string>("");

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

    useEffect(() => {
        const getOrganization = async () => {
            const organizationRef = doc(db, "organizations", id);
            const organizationSnap = await getDoc(organizationRef);
        };
        getOrganization();
    }, [db, id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const organizationRef = doc(db, "organizations", id);

        const organizationSnap = await getDoc(organizationRef);

        if (organizationSnap.exists()) {
            await updateDoc(organizationRef, {
                name: name,
                description: description,
                email: email,
                phone: phone,
                address: address,
            });
            history.push("/organization");
        } else {
            console.log("No such document!");
        }

        setLoading(false);
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
            <IonContent fullscreen >
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

        
        </IonContent>
        </IonPage>
    );
}

export default EditOrganization;