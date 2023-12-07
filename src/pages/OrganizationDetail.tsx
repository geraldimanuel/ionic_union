import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonCard,
  IonCardHeader,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  calendarNumberOutline,
  locationOutline,
  notificationsOutline,
  arrowBackOutline,
  searchOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

const OrganizationDetail: React.FC = () => {
  const history = useHistory();

  const goBack = () => {
    window.history.back();
  };
  return (
    <IonPage style={{ backgroundColor: "DBDBDB" }}>
      {/* Header untuk dicuri */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
          height: "261px",
          borderRadius: "0px 0px 32px 32px",
          padding: "10px 25px",
          position: "relative",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ padding: "0px 15px" }}>
          <IonButtons
            style={{
              position: "absolute",
              top: "10px",
              marginTop: "10px",
              marginLeft: "-15px",
            }}
          >
            <IonButton
              style={{
                backgroundColor: "#ffffff",
                padding: "5px 0px",
                borderRadius: "100%",
              }}
              onClick={goBack}
            >
              <IonIcon color="primary" icon={arrowBackOutline} size="large" />
            </IonButton>
          </IonButtons>
          <div
            style={{
              position: "absolute",
              marginTop: "130px",
              backgroundColor: "white",
              borderRadius: "20%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img src="./images/imkom.png" style={{ width: "100px" }} />
          </div>
        </div>
        <IonText color="light">
          <h1
            style={{
              fontSize: "32px",
              marginTop: "190px",
              marginLeft: "150px",
            }}
          >
            I'm Kom
          </h1>
        </IonText>
      </div>

      <IonContent className="ion-padding">
        <h2>Description</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          malesuada felis in nunc lacinia, non convallis ipsum fermentum. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada
          felis in nunc lacinia, non convallis ipsum fermentum.
        </p>

        <h2>Announcement</h2>
        <p>HALO BELLA!</p>

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
                    <small>18.00 WIB - Selesai</small>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="1">
                    <IonIcon icon={locationOutline}></IonIcon>
                  </IonCol>
                  <IonCol>
                    <small>B0307</small>
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
                    <small>14.00 - 16.00 WIB</small>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="1">
                    <IonIcon icon={locationOutline}></IonIcon>
                  </IonCol>
                  <IonCol>
                    <small>Lecture Hall</small>
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
            <p>Bella Saharani Sopyan (Admin)</p>
          </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonAvatar slot="start">
            <img src="./images/profiles/geri.jpg" />
          </IonAvatar>
          <IonText>
            <p>Gerald Imanuel Wijaya</p>
          </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonAvatar slot="start">
            <img src="./images/profiles/kesya.jpg" />
          </IonAvatar>
          <IonText>
            <p>Kesya Febriana Manampiring (Admin)</p>
          </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonAvatar slot="start">
            <img src="./images/profiles/steve.jpg" />
          </IonAvatar>
          <IonText>
            <p>Steve Christian Wijaya</p>
          </IonText>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default OrganizationDetail;
