import React, { useState } from "react";
import {
    IonContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonPage,
    IonText,
    IonButton,
    IonButtons,
    IonToast,
} from "@ionic/react";
import "./Home.css";
import { useParams, useHistory } from 'react-router-dom';
import {
    calendarClearOutline,
    locationOutline,
    arrowBackOutline,
} from "ionicons/icons";

interface Event {
    id: number;
    date: Date;
    title: string;
    time: string;
    location: string;
    organization: string;
    description: string;
    type: string;
}

interface LoggedUser {
    user: string;
    attended: number[];
    declined: number[];
}

const eventData: Event[] = [
    {
        id: 1,
        date: new Date('2023-12-04T14:00:00'),
        title: 'Talkshow B-Land 2023',
        time: '14.00 - 16.00 WIB',
        location: 'Lecture Hall',
        organization: 'HMIF',
        description: 'Exciting talkshow about B-Land in 2023.',
        type: 'Talkshow',
    },
    {
        id: 2,
        date: new Date('2023-12-05T10:00:00'),
        title: 'Workshop XYZ',
        time: '10.00 - 12.00 WIB',
        location: 'Conference Room',
        organization: 'UMN Radio',
        description: 'Interactive workshop on XYZ topics.',
        type: 'Workshop',
    },
    {
        id: 3,
        date: new Date('2023-12-06T18:00:00'),
        title: 'Seminar ABC',
        time: '18.00 - 20.00 WIB',
        location: 'Auditorium',
        organization: 'Im\'Kom',
        description: 'In-depth seminar discussing ABC subjects.',
        type: 'Seminar',
    },
];


const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const eventId = parseInt(id, 10);
    const history = useHistory();
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const event = eventData.find((e) => e.id === eventId);

    const [loggedUser, setLoggedUser] = useState<LoggedUser>({
        user: 'Kesya',
        attended: [],
        declined: [],
    });

    if (!event) {
        history.push('/home');
        return null;
    }

    const goBack = () => {
        window.history.back();
    };

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    const handleAttend = () => {
        setLoggedUser((prev) => ({ ...prev, attended: [...prev.attended, eventId] }));
        setToastMessage('You confirmed to attend this event');
    };

    const handleDecline = () => {
        setLoggedUser((prev) => ({ ...prev, declined: [...prev.declined, eventId] }));
        setToastMessage("You confirmed you can't attend this event");
    };

    const hasAttendedOrDeclined = loggedUser.attended.includes(eventId) || loggedUser.declined.includes(eventId);

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
                                background:
                                    "linear-gradient(0deg, rgba(18,84,136,1) 0%, rgba(55,202,236,0) 100%)",
                            }}
                        ></div>
                    </div>
                    <div style={{ padding: "0px 15px" }}>
                        <IonButtons
                            style={{ position: "absolute", top: "10px", marginTop: "10px" }}
                        >
                            <IonButton
                                style={{
                                    backgroundColor: "#095797",
                                    padding: "5px 0px",
                                    borderRadius: "100%",
                                }}
                                onClick={goBack}
                            >
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
                                <b>{event.type}</b>
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
                            marginTop: "100px",
                        }}
                    >
                        <IonText color="light">
                            <h1>{event.title}</h1>
                        </IonText>
                    </div>
                </div>
                <div style={{ padding: "0px 25px", marginTop: "-50px" }}>
                    <IonText>
                        <p>Organizations: </p>
                    </IonText>
                    <IonGrid style={{ display: "flex" }}>
                        <IonRow className="ion-align-items-center ion-justify-content-center">
                            <img src="./images/imkom.png" />
                            <IonText style={{ marginLeft: "10px" }}>
                                <p>{event.organization}</p>
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
                            <small style={{ marginLeft: "10px" }}>
                                {formatDate(event.date)}
                            </small>{" "}
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
                                {event.location}
                            </small>
                        </div>
                    </IonText>
                    <IonText>
                        <p style={{ textAlign: "justify", marginTop: "20px" }}>
                            {event.description}
                        </p>
                    </IonText>
                    <div
                        style={{
                            marginTop: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '40px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '15px',
                        }}
                    >
                        {!hasAttendedOrDeclined ? (
                            <>
                                <IonButton
                                    color="secondary"
                                    style={{ borderRadius: '10px', width: '146px' }}
                                    onClick={() => {
                                        handleAttend();
                                    }}
                                >
                                    Attend
                                </IonButton>
                                <IonButton
                                    color="danger"
                                    style={{ borderRadius: '10px', width: '146px' }}
                                    onClick={() => {
                                        handleDecline();
                                    }}
                                >
                                    Decline
                                </IonButton>
                            </>
                        ) : (
                            <p>You already confirmed your attendance or declined this event. This event will shown on your home if you confirmed to attend.</p>
                        )}
                    </div>
                </div>
            </IonContent>
            <IonToast
                isOpen={!!toastMessage}
                onDidDismiss={() => setToastMessage(null)}
                message={toastMessage || ''}
                duration={2000}
            />
        </IonPage>
    );
};

export default EventDetail;
