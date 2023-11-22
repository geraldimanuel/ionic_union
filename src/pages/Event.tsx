import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
    IonIcon,
	IonTitle,
    IonText,
    IonBadge,
	IonToolbar,
    IonItem,
    IonLabel,
    IonCard,
    IonGrid,
    IonRow,
    IonCol
} from "@ionic/react";
import { notificationsOutline, searchOutline, calendarClearOutline, locationOutline, appsOutline } from 'ionicons/icons';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Event: React.FC = () => {

    const data = [
        {
          title: "JOLLITY: Closing Concert COMMFEST UMN 2023",
          date: "Saturday, Nov 11, 2023",
          time: "15.30 WIB - Selesai",
          location: "Lapangan Universitas Multimedia Nusantara"
        },
        {
            title: "JOLLITY: Closing Concert COMMFEST UMN 2023",
            date: "Saturday, Nov 11, 2023",
            time: "15.30 WIB - Selesai",
            location: "Lapangan Universitas Multimedia Nusantara"
        },
        {
            title: "JOLLITY: Closing Concert COMMFEST UMN 2023",
            date: "Saturday, Nov 11, 2023",
            time: "15.30 WIB - Selesai",
            location: "Lapangan Universitas Multimedia Nusantara"
        },
      ];

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

			<IonContent style={{top:"40px"}} className="ion-padding">
                    <IonText>
                        <h2 style={{marginTop:"-5px", marginLeft:"10px"}}>Popular Events</h2>
                    </IonText>
                    <img style={{marginLeft:"10px"}} src="../images/hahaha.png" />
                    {data.map((item, index) => (
                        <IonCard key={index} style={{ borderRadius: "10px" }}>
                        <img src="../images/cardImage.png" style={{ position: "relative", zIndex: "1" }} />
                        <div style={{
                            zIndex: "2",
                            top: "-165px",
                            left: "10px",
                            backgroundColor: "#2a93d5",
                            height: "22px",
                            width: "64px",
                            borderRadius: "10px",
                            position: "relative",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <IonText color="light" style={{ textAlign: "center", paddingBottom: "5px" }}>
                            <small><b>Concert</b></small>
                            </IonText>
                        </div>
                        <div style={{ padding: "0px 10px", marginTop: "-30px" }}>
                            <IonText color="dark">
                            <h2>{item.title}</h2>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <IonIcon icon={calendarClearOutline} /> <small style={{ marginLeft: "10px" }}>{item.date} ({item.time})</small> <br></br>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <IonIcon icon={locationOutline} /> <small style={{ marginLeft: "10px" }}>{item.location}</small>
                            </div>
                            </IonText>
                            <div style={{
                            marginTop: "10px",
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '40px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: "15px"
                            }}>
                            <IonButton color="secondary" style={{ borderRadius: "10px", width: "146px" }}>
                                Attend
                            </IonButton>
                            <IonButton color="danger" style={{ borderRadius: "10px", width: "146px" }}>
                                Decline
                            </IonButton>
                            </div>
                        </div>
                        </IonCard>
                    ))}  
			</IonContent>
		</IonPage>
	);
};

export default Event;
