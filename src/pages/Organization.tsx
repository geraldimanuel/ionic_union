import { IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTabBar, IonTabButton, IonicSlides } from "@ionic/react";
import { bag, albums, home, calendar, people } from "ionicons/icons";

const Organization: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <h1>Organization</h1>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>My Organization</h2>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonRow>
                                    <img src="./imkom.png" />
                                    <h3>Im'Kom</h3>
                                </IonRow>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard>
                                <IonRow>
                                    <img src="./radio.png" />
                                    <h3>UMN Radio</h3>
                                </IonRow>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                
                <h2>Organizations</h2>
                <IonGrid>
                    <IonCard style={{ height: "125px"}}>
                        <IonRow className="ion-text-center" style={{ marginTop: "30px" }}>
                            <IonCol size="4">
                                <img src="./imkom.png" />
                            </IonCol>
                            <IonCol size="4">
                                <h3>Im'Kom</h3>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                    <IonCard style={{ height: "125px" }}>
                        <IonRow className="ion-text-center" style={{ marginTop: "30px" }}>
                            <IonCol size="4">
                                <img style={{ marginTop: "15px" }} src="./radio.png" />
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