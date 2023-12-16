import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLoading, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonIcon, IonSelect, IonList, IonSelectOption, IonTextarea, IonCard, IonAvatar } from "@ionic/react";
import { arrowBack, arrowBackOutline, pencil } from "ionicons/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";


interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profile_picture: string;
}

const EditProfile: React.FC = () => {

   const [user, setUser] = useState<User>({
        id: 1,
        name: "Bella",
        email: "bella@gmail",
        password: "123",
        confirmPassword: "123",
        profile_picture: "./images/profiles/bella.jpg",
    });

    const [image, setImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string>();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    const history = useHistory();


    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("password", password);
        data.append("confirmPassword", confirmPassword);
        data.append("profile_picture", image as Blob);

        fetch("http://localhost:5000/users", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setError(res.error);
                } else {
                    localStorage.setItem("user", JSON.stringify(res));
                    history.push("/profile");
                }
            });
    }


    const goBack = () => {
        window.history.back();
    };

    useEffect(() => {
        const selectedUser = localStorage.getItem("user");
        if (selectedUser) {
            setName(JSON.parse(selectedUser).name);
            setEmail(JSON.parse(selectedUser).email);
            setPassword(JSON.parse(selectedUser).password);
            setConfirmPassword(JSON.parse(selectedUser).confirmPassword);

        }
    }, []);



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
                        id = "password"
                        placeholder="Enter your password"
                        onIonChange={(e) => setPassword(e.detail.value!)}
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
                        id = "confirmPassword"
                        placeholder="Confirm your password"
                        onIonChange={(e) => setConfirmPassword(e.detail.value!)}
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
