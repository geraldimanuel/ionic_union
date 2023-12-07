import { IonBadge, IonButton, IonCard, IonCardHeader, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText } from "@ionic/react";
import { notificationsOutline, searchOutline } from "ionicons/icons";

const Calendar: React.FC = () => {
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
                <IonDatetime 
                style={{marginTop: "20px"}}
                // dayValues utk highlight hari yang ada eventnya
                >
                </IonDatetime>
            </IonContent>
        </IonPage>
    );
}

export default Calendar;