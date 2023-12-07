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
    IonRouterLink,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
} from "@ionic/react";
import {
    notificationsOutline,
    searchOutline,
    calendarNumberOutline,
    locationOutline,
    appsOutline,
} from "ionicons/icons";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useHistory } from 'react-router-dom';

const eventData = [
    {
        id: 2,
        date: '04 Dec',
        title: 'Talkshow B-Land 2023',
        time: '14.00 - 16.00 WIB',
        location: 'Lecture Hall',
    },
    {
        id: 1,
        date: '07 Dec',
        title: 'Rapat Pleno HMIF',
        time: '10.00 - 11.00 WIB',
        location: 'B309',
    },
    {
        id: 4,
        date: '10 Dec',
        title: 'Pembubaran Panitia Radioactive',
        time: '10.00 - 11.00 WIB',
        location: 'McDonalds SDC',
    },
];

const Home: React.FC = () => {
    const history = useHistory();

    const handleClickEvent = () => {
        history.push(`/createevent`);
    };

    const handleClickOrganization = () => {
        history.push(`/createorganization`);
    };

    //Ini untuk sort event data biar urut dari yg id terkecil (tapi nanti diganti sama date terkecil)
    const sortedEventData = eventData.sort((a, b) => a.id - b.id);

    return (
        <IonPage style={{ backgroundColor: "DBDBDB" }}>
            <div style={{
                background: "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
                height: "231px",
                borderRadius: "0px 0px 32px 32px",
                padding: "10px 25px",
                position: "relative",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}>
                <div style={{ textAlign: "right", marginTop: "70px" }}>
                </div>
                <IonText color="light">
                    <p>Hello, Kesya!</p>
                    <h1
                        style={{
                            fontSize: "32px",
                        }}
                    >
                        Welcome to <br></br> UNION!
                    </h1>
                </IonText>
            </div>

            <IonContent style={{ top: "10px" }} className="ion-padding">
                <IonText>
                    <h2 style={{ marginTop: "-5px", marginLeft: "10px" }}>
                        Make your own event and organization!
                    </h2>
                </IonText>
                <IonButton onClick={handleClickEvent}>
                    Create Event
                </IonButton>

                <IonButton onClick={handleClickOrganization}>
                    Create Organization
                </IonButton>

                <IonText>
                    <h2 style={{ marginTop: "10px", marginLeft: "10px" }}>
                        Your Upcoming Events
                    </h2>
                </IonText>
                {eventData.length > 0 ? (sortedEventData.map((event) => (
                    <IonRouterLink key={event.id} routerLink={`/event/${event.id}`}>
                        <IonCard>
                            <IonGrid>
                                <IonRow>
                                    <IonCol style={{ backgroundColor: '#D93D3D' }} size="3">
                                        <h1 style={{ textAlign: 'center', color: 'white' }}>{event.date}</h1>
                                    </IonCol>
                                    <IonCol>
                                        <IonRow>
                                            <h3 style={{ marginLeft: '5px' }}>{event.title}</h3>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol size="1">
                                                <IonIcon icon={calendarNumberOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol>
                                                <small>{event.time}</small>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol size="1">
                                                <IonIcon icon={locationOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol>
                                                <small>{event.location}</small>
                                            </IonCol>
                                        </IonRow>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>
                    </IonRouterLink>
                ))) : (
                    <IonText>
                        <p style={{ marginLeft: "10px" }}>
                        You have no upcoming events. Explore all events{' '}
                        <IonRouterLink routerLink="/events" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                            here
                        </IonRouterLink>
                        .
                    </p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Home;
