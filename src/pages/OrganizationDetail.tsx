import { IonAvatar, IonBadge, IonButton, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText } from "@ionic/react";
import { calendarNumberOutline, locationOutline, notificationsOutline, searchOutline } from "ionicons/icons";

const OrganizationDetail: React.FC = () => {
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
                    }}>Let's find your <br></br> favorite events!</h1>
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
                        <img src="./images/profiles/bella.jpg" />
                    </IonAvatar>
                    <IonText>
                        <regular>Bella Saharani Sopyan (Admin)</regular>
                    </IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonAvatar slot="start">
                        <img src="./images/profiles/geri.jpg" />
                    </IonAvatar>
                    <IonText>
                        <regular>Gerald Imanuel Wijaya</regular>
                    </IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonAvatar slot="start">
                        <img src="./images/profiles/kesya.jpg" />
                    </IonAvatar>
                    <IonText>
                        <regular>Kesya Febriana Manampiring (Admin)</regular>
                    </IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonAvatar slot="start">
                        <img src="./images/profiles/steve.jpg" />
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