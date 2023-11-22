import { IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow } from "@ionic/react";

const Organization: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <h1>Organization</h1>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>My Organization</h2>
                {/* <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard className="ion-text-center" style={{ height: "78px" }}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <img src="./imkom.png" />
                                        </IonCol>
                                        <IonCol>
                                            <h3>Im'Kom</h3>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard style={{ height: "78px" }}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <img style={{ marginTop: "20px" }} src="./radio.png" />
                                        </IonCol>
                                        <IonCol>
                                            <h3>UMN Radio</h3>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid> */}

                <IonContent className="wrapper" style={{ height: "120px", overflowX: "auto", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex" }}> 
                        <IonCard className="ion-text-center" style={{ height: "78px", width: "180px" }}>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <img style={{ marginTop: "3px" }} src="./imkom.png" />
                                    </IonCol>
                                    <IonCol size="8">
                                        <h3>Im'Kom</h3>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>

                        <IonCard className="ion-text-center" style={{ height: "78px", width: "180px" }}>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <img style={{ marginTop: "20px" }} src="./radio.png" />
                                    </IonCol>
                                    <IonCol size="8">
                                        <h3>UMN Radio</h3>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>
                    </div>
                    
                </IonContent>
                
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