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
    add,
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

interface Event {
    id: number;
    date: Date;
    title: string;
    time: string;
    location: string;
}

const eventData: Event[] = [
    {
        id: 1,
        date: new Date('2023-12-04T14:00:00'),
        title: 'Talkshow B-Land 2023',
        time: '14.00 - 16.00 WIB',
        location: 'Lecture Hall',
    },
    {
        id: 2,
        date: new Date('2023-12-05T10:00:00'),
        title: 'Workshop XYZ',
        time: '10.00 - 12.00 WIB',
        location: 'Conference Room',
    },
    {
        id: 3,
        date: new Date('2023-12-06T18:00:00'),
        title: 'Seminar ABC',
        time: '18.00 - 20.00 WIB',
        location: 'Auditorium',
    },
];

const logged_user = {
    user: 'Kesya',
    attended: [1, 2],
};

const Home: React.FC = () => {
    const history = useHistory();

    const handleClickEvent = () => {
        history.push(`/createevent`);
    };

    const handleClickOrganization = () => {
        history.push(`/createorganization`);
    };

    //ini untuk sort yg dihadirin sama logged user aja + sort date
    const sortedEventData: Event[] = eventData
        .filter((event) => logged_user.attended.includes(event.id))
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    const formatEventDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: '2-digit'
        };
        return date.toLocaleDateString(undefined, options);
    };

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
                <IonGrid>
                    <IonCol>
                        <IonButton onClick={handleClickEvent} style={{ '--background': 'linear-gradient(90deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)' }}>
                            <IonIcon icon={add} slot="start" />
                            Create Event
                        </IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton onClick={handleClickOrganization} style={{ '--background': 'linear-gradient(90deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)' }}>
                            <IonIcon icon={add} slot="start" />
                            Create Org
                        </IonButton>
                    </IonCol>
                </IonGrid>
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
                                        <h1 style={{ textAlign: 'center', color: 'white' }}>{formatEventDate(event.date)}</h1>
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
                            You haven't attended any events. Explore all events{' '}
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
