import { IonBadge, IonButton, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText } from "@ionic/react";
import { notificationsOutline, searchOutline } from "ionicons/icons";
import { useHistory } from 'react-router-dom';

const Organization: React.FC = () => {
    const history = useHistory();

    const handleCardClick = (eventId: string) => {
		history.push(`/organization/1`);
	};
    return (
        <IonPage style={{backgroundColor:"DBDBDB"}}>
            {/* Header untuk dicuri */}
            <div style={{
                background:"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)", 
                height:"261px", 
                borderRadius:"0px 0px 32px 32px",
                padding:"10px 25px",
                position:"relative",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                    <IonButton color="secondary" style={{ position: "relative", top:"45px", left:"315px", width:"51px", height:"51px", borderRadius:"14px" }} slot="end">
                        <IonIcon icon={notificationsOutline} />
                        <IonBadge
                            color="danger"
                            style={{
                            position: "absolute",
                            top: "4px",
                            left: "15px",
                            width: "5px",
                            height: "5px",
                            borderRadius: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            }}
                        >
                        </IonBadge>
                    </IonButton>
                <IonText color="light">
                    <p>Hello, Kesya!</p>
                    <h1 style={{
                        fontSize:"32px"
                    }}>Manage your <br></br> organization!</h1>
                </IonText>
                <IonItem style={{top:"30px", borderRadius:"28px", height:"56px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                    <IonLabel><IonIcon icon={searchOutline} /></IonLabel>
                    <IonInput 
                        style={{left:"5px", borderRadius:"28px", height:"56px"}}
                        type="text"
                        placeholder="Search here. . ."
                    />
                </IonItem>
            </div>

            <IonContent className="ion-padding">
                <h2>My Organization</h2>
                <IonItem lines="none" className="orgWrapper" onClick={() => handleCardClick("1")}>
                    <IonItem className="orgItem">
                        <IonGrid className="orgGrid">
                            <IonRow>
                                <IonCol>
                                    <img style={{ marginTop: "6px" }} src="./images/imkom.png" />
                                </IonCol>
                                <IonCol size="8">
                                    <h3>Im'Kom</h3>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem className="orgItem">
                        <IonGrid className="orgGrid">
                            <IonRow>
                                <IonCol>
                                    <img style={{ marginTop: "20px" }} src="./images/radio.png" />
                                </IonCol>
                                <IonCol size="8">
                                    <h3>UMN Radio</h3>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem className="orgItem">
                        <IonGrid className="orgGrid">
                            <IonRow>
                                <IonCol>
                                    <img style={{ marginTop: "6px" }} src="./images/imkom.png" />
                                </IonCol>
                                <IonCol size="8">
                                    <h3>Im'Kom</h3>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem className="orgItem">
                        <IonGrid className="orgGrid">
                            <IonRow>
                                <IonCol>
                                    <img style={{ marginTop: "20px" }} src="./images/radio.png" />
                                </IonCol>
                                <IonCol size="8">
                                    <h3>UMN Radio</h3>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonItem>
                
                <h2>Organizations</h2>
                <IonItem lines="none" className="catWrapper">
                    <IonItem lines="none" color="secondary" className="catItem">
                        <small className="catText">All</small>
                    </IonItem>
                    <IonItem lines="none" className="catItem">
                        <small className="catText">Himpunan</small>
                    </IonItem>
                    <IonItem lines="none" className="catItem">
                        <small className="catText">Media Kampus</small>
                    </IonItem>
                    <IonItem lines="none" className="catItem">
                        <small className="catText">UKM Olahraga</small>
                    </IonItem>
                    <IonItem lines="none" className="catItem">
                        <small className="catText">UKM Seni</small>
                    </IonItem>
                </IonItem>

                <IonGrid>
                    <IonCard style={{ height: "125px"}}>
                        <IonRow className="ion-text-center" style={{ marginTop: "30px" }}>
                            <IonCol size="4">
                                <img src="./images/imkom.png" />
                            </IonCol>
                            <IonCol size="4">
                                <h3>Im'Kom</h3>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                    <IonCard style={{ height: "125px" }}>
                        <IonRow className="ion-text-center" style={{ marginTop: "30px" }}>
                            <IonCol size="4">
                                <img style={{ marginTop: "15px" }} src="./images/radio.png" />
                            </IonCol>
                            <IonCol size="4">
                                <h3>UMN Radio</h3>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                    <IonCard style={{ height: "125px"}}>
                        <IonRow className="ion-text-center" style={{ marginTop: "30px" }}>
                            <IonCol size="4">
                                <img src="./images/imkom.png" />
                            </IonCol>
                            <IonCol size="4">
                                <h3>Im'Kom</h3>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                    <IonCard style={{ height: "125px" }}>
                        <IonRow className="ion-text-center" style={{ marginTop: "30px" }}>
                            <IonCol size="4">
                                <img style={{ marginTop: "15px" }} src="./images/radio.png" />
                            </IonCol>
                            <IonCol size="4">
                                <h3>UMN Radio</h3>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Organization;