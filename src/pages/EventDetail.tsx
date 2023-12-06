// import {
// 	IonButton,
// 	IonContent,
// 	IonHeader,
// 	IonInput,
// 	IonPage,
//     IonIcon,
// 	IonTitle,
//     IonText,
//     IonBadge,
// 	IonToolbar,
//     IonItem,
//     IonLabel,
//     IonCard,
//     IonGrid,
//     IonRow,
//     IonCol
// } from "@ionic/react";
// import { notificationsOutline, searchOutline, calendarClearOutline, locationOutline, appsOutline } from 'ionicons/icons';
// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// const EventDetail: React.FC = () => {

//     const data = [
//         {
//           title: "JOLLITY: Closing Concert COMMFEST UMN 2023",
//           date: "Saturday, Nov 11, 2023",
//           time: "15.30 WIB - Selesai",
//           location: "Lapangan Universitas Multimedia Nusantara"
//         },
//       ];

// 	return (
// 		<IonPage style={{backgroundColor:"DBDBDB"}}>
           
// 			<IonContent style={{top:"40px"}} className="ion-padding">
//                     Ini Page Detail
// 			</IonContent>
// 		</IonPage>
// 	);
// };

// export default EventDetail;

import React from "react";
import {
  IonContent,
  IonHeader,
  IonCard,
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonPage,
  IonItemGroup,
  IonItem,
  IonText,
  IonTitle,
  IonButton,
  IonButtons,
  IonToolbar,
  IonAvatar,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonItemDivider,
} from "@ionic/react";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useHistory } from 'react-router-dom';
import { warningOutline, arrowBackOutline } from "ionicons/icons";
import {
	notificationsOutline,
	searchOutline,
	calendarClearOutline,
	locationOutline,
	appsOutline,
} from "ionicons/icons";

const EventDetail: React.FC = () => {
    const history = useHistory();

    const goBack = () => {
        window.history.back();
      };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{ width: "100%", height: "300px" }}>
        <div style={{ position: "relative" }}>
  <img
    src="./images/cardImage.png"
    style={{ width: "100%", height: "250px", objectFit: "cover" }}
  />
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(0deg, rgba(18,84,136,1) 0%, rgba(55,202,236,0) 100%)",
    }}
  ></div>
</div>
          <div style={{padding:"0px 15px"}}>
          <IonButtons style={{position: "absolute", top: "10px", marginTop:"10px"}}>
            <IonButton style={{backgroundColor:"#095797", padding:"5px 0px", borderRadius:"100%"}} onClick={goBack}>
                <IonIcon color="light" icon={arrowBackOutline} size="large" />
            </IonButton>
          </IonButtons>
          </div>
          <div
                  style={{
                    position: "absolute",
                    top: "130px",
                    left: "25px",
                    zIndex: "2",
                    backgroundColor: "#2A93D5",
                    width: "59px",
                    height: "18px",
                    borderRadius: "21px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <IonText color="light" className="ion-text-center">
                    <p className="small">
                      <b>Concert</b>
                    </p>
                  </IonText>
                </div>
          <div
            style={{
              width: "100%",
              zIndex: "2",
              padding: "10px 25px",
              position: "absolute", 
              top: "30px", 
              marginTop:"100px"
            }}
          >
            <IonText color="light">
              <h1>
              JOLLITY: Closing Concert COMMFEST UMN 2023
                </h1>
            </IonText>
          </div>
        </div>
        <div style={{padding:"0px 25px", marginTop:"-50px"}}>
            <IonText>
                <p>Organizations: </p>
            </IonText>
            <IonGrid style={{ display: "flex" }}>
            <IonRow className="ion-align-items-center ion-justify-content-center">
                <img src="./images/imkom.png" />
                <IonText style={{ marginLeft: "10px" }}>
                <p>I'm Kom</p>
                </IonText>
            </IonRow>
            </IonGrid>
            <IonText color="dark">
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
                                        marginTop: "20px",
									}}
								>
									<IonIcon icon={calendarClearOutline} />{" "}
									<small style={{ marginLeft: "10px" }}>Saturday, Nov 11, 2023 (15.30 WIB - Selesai)</small>{" "}
									<br></br>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<IonIcon icon={locationOutline} />{" "}
									<small style={{ marginLeft: "10px" }}>
										Lapangan Parkir FH UMN
									</small>
								</div>
							</IonText>
            <IonText>
                <p style={{textAlign:"justify", marginTop:"20px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut. Dictum non consectetur a erat nam. Placerat in egestas erat imperdiet sed. Sed tempus urna et pharetra pharetra massa. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Tortor aliquam nulla facilisi cras fermentum odio. Sagittis eu volutpat odio facilisis mauris. Fermentum odio eu feugiat pretium. Nisl purus in mollis nunc sed id. Scelerisque eu ultrices vitae auctor eu augue. Iaculis urna id volutpat lacus laoreet. Nec sagittis aliquam malesuada bibendum arcu vitae. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Auctor elit sed vulputate mi.</p>
<p style={{textAlign:"justify"}}>Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Blandit turpis cursus in hac habitasse. Sagittis orci a scelerisque purus semper eget duis at tellus. Mauris pharetra et ultrices neque ornare aenean euismod. Augue mauris augue neque gravida in. Hendrerit dolor magna eget est lorem ipsum dolor. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Tincidunt dui ut ornare lectus sit amet. Lacus vel facilisis volutpat est velit. Aliquet bibendum enim facilisis gravida neque convallis a. Volutpat maecenas volutpat blandit aliquam etiam. Enim neque volutpat ac tincidunt vitae semper quis. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Quis blandit turpis cursus in hac habitasse platea dictumst.</p>
            </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventDetail;

// // EventDetail.tsx
// import React, { useEffect, useState } from 'react';
// import { IonPage, IonContent, IonText, IonButton } from '@ionic/react';
// import { useParams } from 'react-router-dom';
// import { db } from '../firebaseConfig';
// import { doc, getDoc } from 'firebase/firestore';

// const EventDetail: React.FC = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   const [eventDetails, setEventDetails] = useState<any>(null);
//   const eventDocRef = doc(db, 'events', eventId);

//   useEffect(() => {
//     async function fetchEventData() {
//         const origin = "your_origin_value"; // Replace 'your_origin_value' with the actual value
//         const q = query(collection(db, "events"), where("origin", "==", "hmif"));

//         try {
//             const querySnapshot = await getDocs(q);
//             const events: any = [];
//             querySnapshot.forEach((doc) => {
//                 // Push each document's data to the events array
//                 events.push({ id: doc.id, data: doc.data() });
//             });
//             setEventData(events); // Set the state with retrieved data
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     }

//     fetchEventData();
// }, [db]);

//   return (
//     <IonPage>
//       <IonContent className="ion-padding">
//         {eventDetails ? (
//           <>
//             <IonText>
//               <h2>{eventDetails.heading}</h2>
//             </IonText>
//             <IonText color="dark">
//               <p>Date: {eventDetails.date}</p>
//               <p>Location: {eventDetails.location}</p>
//               <p>Description: {eventDetails.description}</p>
//             </IonText>
//             <IonButton color="secondary">Attend</IonButton>
//             <IonButton color="danger">Decline</IonButton>
//           </>
//         ) : (
//           <IonText>Loading event details...</IonText>
//         )}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default EventDetail;