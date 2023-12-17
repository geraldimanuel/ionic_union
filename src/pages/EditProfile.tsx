import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLoading, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonIcon, IonSelect, IonList, IonSelectOption, IonTextarea, IonCard, IonAvatar } from "@ionic/react";
import { arrowBack, arrowBackOutline, pencil } from "ionicons/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";


interface User {
    email: string;
    event_attended: string[];
    event_declined: string[];
    name: string;
    origin: string[];
    profile_picture: string;
}

const EditProfile: React.FC = () => {

    const [image, setImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string>();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    const history = useHistory();

    const goBack = () => {
        window.history.back();

    }

    const [user, setUser] = useState<User>({
		email: "bellass@gmail.com",
		event_attended: ["imkom", "umnradio"],
		event_declined: [],
		name: "bella",
		origin: ["imkom", "umnradio"],
		profile_picture: "./images/profiles/bella.jpg",
	});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target!.result as string);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const editProfile = async (
        name: string,
        email: string,
        image?: File
    ) => {
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("name", name);
        formData.append("email", email);

        const response = await fetch("http://localhost:8100/nav/profile", {
            method: "PUT",
            body: formData,
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Could not edit profile.");
        }
        return data.user;
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(undefined);
            const user = await editProfile(
                name,
                email,
                image
            );
            setUser(user);
            setLoading(false);
            history.push("/profile");
        } catch (error) {
            // setError(error.message);
            setLoading(false);
        }
        // history.push("nav/profile");
        window.history.back();
    };






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
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                
                <IonGrid>
                    {/* <IonCard style={{ */}
                        
                    {/* }}> */}
                        <IonRow className="ion-text-center" >
                            <IonCol style={{
                                borderRadius: "20px",
                                top: "10px",
                                marginLeft: "10px",
                                marginRight: "10px",
                                
                            }}>
                                <IonAvatar style={{
                                    width: "100px",
                                    height: "100px",
                                    
                                }}>
                                    <img src={user.profile_picture} />
                                </IonAvatar>
                            </IonCol>
                        </IonRow>
                        <IonIcon icon={pencil} style={{
                            position: "absolute",
                            top: "80px",
                            left: "80px",
                            width: "20px",
                            color: "white",
                        }}></IonIcon>

                    {/* </IonCard> */}
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
                        label="Name"
                        value={name}
                        fill="outline"
                        labelPlacement="floating"
                        id = "name"
                        placeholder="Enter your name"
                        onIonChange={(e) => setName(e.detail.value!)}
                        
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
                        label="Email"
                        value={email}
                        fill="outline"
                        labelPlacement="floating"
                        id = "email"
                        placeholder="Enter your email"
                        onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                    </IonItem>
                    {/* <IonItem style={{
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
                        id = "password"
                        placeholder="Enter your password"
                        onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                    </IonItem> */}
                    {/* <IonItem style={{
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
                        id = "confirmPassword"
                        placeholder="Confirm your password"
                        onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                    />
                    </IonItem> */}

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
