import { IonAvatar, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRow, IonText } from "@ionic/react";
import { calendarNumberOutline, locationOutline } from "ionicons/icons";

const OrganizationDetail: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h2>Description</h2>
                <regular>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Donec malesuada felis in nunc lacinia, non convallis 
                    ipsum fermentum. Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit. Donec malesuada felis in 
                    nunc lacinia, non convallis ipsum fermentum.
                </regular>
                
                <h2>Announcement</h2>
                <regular>
                    HALO BELLA!
                </regular>
                
                <h2>Events</h2>
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol style={{ backgroundColor: "#D93D3D" }} size="3">
                                <h1 style={{ textAlign: "center", color: "white" }}>01 Dec</h1>
                            </IonCol>
                            <IonCol>
                                <IonRow>
                                    <h3 style={{ marginLeft: "5px" }}>Rapat Pleno Desember</h3>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="1">
                                        <IonIcon icon={calendarNumberOutline}></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        <smallmedium>18.00 WIB - Selesai</smallmedium>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="1">
                                        <IonIcon icon={locationOutline}></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        <smallmedium>B0307</smallmedium>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol style={{ backgroundColor: "#D93D3D" }} size="3">
                                <h1 style={{ textAlign: "center", color: "white" }}>04 Dec</h1>
                            </IonCol>
                            <IonCol>
                                <IonRow>
                                    <h3 style={{ marginLeft: "5px" }}>Talkshow B-Land 2023</h3>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="1">
                                        <IonIcon icon={calendarNumberOutline}></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        <smallmedium>14.00 - 16.00 WIB</smallmedium>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="1">
                                        <IonIcon icon={locationOutline}></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        <smallmedium>Lecture Hall</smallmedium>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
                
                <h2>Members</h2>
                <IonItem lines="none">
                    <IonAvatar slot="start">
                        <img src="./profiles/bella.jpg" />
                    </IonAvatar>
                    <IonText>
                        <regular>Bella Saharani Sopyan (Admin)</regular>
                    </IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonAvatar slot="start">
                        <img src="./profiles/geri.jpg" />
                    </IonAvatar>
                    <IonText>
                        <regular>Gerald Imanuel Wijaya</regular>
                    </IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonAvatar slot="start">
                        <img src="./profiles/kesya.jpg" />
                    </IonAvatar>
                    <IonText>
                        <regular>Kesya Febriana Manampiring (Admin)</regular>
                    </IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonAvatar slot="start">
                        <img src="./profiles/steve.jpg" />
                    </IonAvatar>
                    <IonText>
                        <regular>Steve Christian Wijaya</regular>
                    </IonText>
                </IonItem>
                
            </IonContent>
        </IonPage>
    );
}

export default OrganizationDetail;