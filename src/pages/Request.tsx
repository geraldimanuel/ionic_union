import { IonAlert, IonAvatar, IonBadge, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonText, IonThumbnail, IonToast, isPlatform } from "@ionic/react";
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, setupIonicReact } from "@ionic/react";
import { addOutline, arrowBack, ban, banSharp, cart, checkmark, create, trash } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { arrowBackOutline } from "ionicons/icons";

setupIonicReact();

export const DATA = [
    {id: 'm1', name: "John Doe", message: 'Request to join I\'mKOM', avatar: "https://www.w3schools.com/howto/img_avatar.png"},
    {id: 'm2', name: "John Thor", message: 'Request to join I\'mKOM', avatar: "https://www.w3schools.com/howto/img_avatar.png"},
    {id: 'm3', name: "John Wick", message: 'Request to join I\'mKOM', avatar: "https://www.w3schools.com/howto/img_avatar.png"},
    {id: 'm4', name: "John Cena", message: 'Request to join I\'mKOM', avatar: "https://www.w3schools.com/howto/img_avatar.png"},
    {id: 'm5', name: "John Wick", message: 'Request to join I\'mKOM', avatar: "https://www.w3schools.com/howto/img_avatar.png"},
]

const Request: React.FC = () => {

    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

    const [toastMessage, setToastMessage] = useState("");
    const [startRejecting, setStartRejecting] = useState(false);
    const [startAccepting, setStartAccepting] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<
    { id: string; 
        name: string; 
        message: string; 
        avatar: string } | undefined>();


    const startRejectingHandler = (id: string) => {
        DATA.splice(DATA.findIndex((data) => data.id === id), 1);
        setSelectedRequest(DATA.find((data) => data.id === id));
        setStartRejecting(true);
        setToastMessage("Request rejected!");
    }

    const startAcceptingHandler = (id: string) => {
        DATA.splice(DATA.findIndex((data) => data.id === id), 1);
        setSelectedRequest(DATA.find((data) => data.id === id));
        setStartAccepting(true);
        setToastMessage("Request accepted!");
    }

    const goBack = () => {
        window.history.back();
    };



    return(
        <>
        <React.Fragment>
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => {
            setToastMessage("");
          }}
        />
      </React.Fragment>
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
					}}>
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
						Accept Request
					</IonTitle>
				</div>
            </IonHeader>
            <IonContent fullscreen>
            <div style={{
                display:"flex",
                flexDirection:"row",
                
            }}>
            <IonCard style={{
                width:"100%",
                // height:"100px",
                height: "50px",
                borderRadius:"20px",
                background:"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                // margin:"10px 10px 10px 10px",
                // padding:"10px 10px 10px 10px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                color : "white",
                bottom: "10px",
            
            }}>
                    <IonCardContent>
                        <IonCardSubtitle style={{
                            bottom: "8px",
                        }}color="light"> Requests 
                            <IonLabel>
                            <IonBadge color="danger" style={{
                                marginLeft: "5px",
                                size: "small",
                            }}>
                            {DATA.length ? DATA.length : null}
                            </IonBadge>
                            </IonLabel>
                            </IonCardSubtitle>
                    </IonCardContent>
            </IonCard>
            </div>
            {DATA.map((data) => (
            <IonList>
                <IonItemSliding key={data.id}ref={slidingOptionsRef}>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img src={data.avatar} />
                        </IonAvatar>
                        <IonLabel>
                            <h2>{data.name}</h2>
                            <p>{data.message}</p>
                        </IonLabel>
                        <IonIcon icon={arrowBack} slot="end" />
                    </IonItem>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={startRejectingHandler.bind(null, data.id)}>
                            <IonIcon slot="icon-only" icon={ban} />
                        </IonItemOption>
                        <IonItemOption color="success" onClick={startAcceptingHandler.bind(null, data.id)}>
                            <IonIcon slot="icon-only" icon={checkmark} />
                        </IonItemOption>
                    </IonItemOptions>
                    </div>
                </IonItemSliding>
            </IonList>
            ))}
            </IonContent>  
        </IonPage>    
        </>
        );
};


export default Request;