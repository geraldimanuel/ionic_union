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
            <div className="" style={{}}>
			<IonTabBar color="primary" slot="bottom" 
				style={{
					borderRadius: "20px",
					position: "floating",
					padding: "10px",
					bottom: "20px",
					marginBottom: "15px",
				}}>
                <IonTabButton tab="organization" href="/organization">
                    <IonIcon icon={bag} color="light" size="small"/>
                    <IonLabel>Organization</IonLabel>
                </IonTabButton>
                <IonTabButton tab="events" href="/events">
                    <IonIcon icon={albums} color="light" size="small"/>
                    <IonLabel>Events</IonLabel>
                </IonTabButton>
                <IonTabButton tab="home" href="/home">
                    <IonIcon icon={home} size="large" style={{
						// backgroundRadius: "30px",
						// backgroundShape: "circle",
						// backgroundColor: "red",
						borderRadius: "15px",
						
					}} />
                </IonTabButton>
                <IonTabButton tab="calendar" href="/calendar">
                    <IonIcon icon={calendar} color="light" size="small"/>
                    <IonLabel>Calendar</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={people} color="light" size="small"/>
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
			</div>
        </IonPage>
    );
}

export default Organization;