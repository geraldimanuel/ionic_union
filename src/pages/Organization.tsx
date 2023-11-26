import { IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow } from "@ionic/react";

const Organization: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <h1>Organization</h1>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>My Organization</h2>
                <IonItem lines="none" className="orgWrapper">
                    <IonItem className="orgItem">
                        <IonGrid className="orgGrid">
                            <IonRow>
                                <IonCol>
                                    <img style={{ marginTop: "6px" }} src="./imkom.png" />
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
                                    <img style={{ marginTop: "20px" }} src="./radio.png" />
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
                                    <img style={{ marginTop: "6px" }} src="./imkom.png" />
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
                                    <img style={{ marginTop: "20px" }} src="./radio.png" />
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