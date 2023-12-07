import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonButtons,
    IonSelectOption,
    IonLoading,
    IonAlert,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    IonCard,
    IonCol,
    IonGrid,
    IonRow,
    IonToast,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { arrowBack, pencil } from "ionicons/icons";
import { Link } from "react-router-dom";
import { addEvent } from "../firebaseConfig";
import { useHistory, useParams } from 'react-router-dom';

const organization = Object.freeze([
    { code: "hmif", name: "HMIF" },
    { code: "umnradio", name: "UMN Radio" },
    { code: "imkom", name: "Im'Kom" },
]);

interface Event {
    id: number;
    date: Date;
    title: string;
    time: string;
    location: string;
    organization: string;
    description: string;
    type: string;
    user: string;
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
        type: 'Concert',
        user: 'Kesya',
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
        user: 'Geri',
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
        user: 'Bella',
    },
];

const EditEvent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const eventId = parseInt(id, 10);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [description, setDescription] = useState("");
    const [heading, setHeading] = useState("");
    const [location, setLocation] = useState("");

    const [date, setDate] = useState<any>();
    const [category, setCategory] = useState<string[]>([]);
    const [status, setStatus] = useState(true);
    const [origin, setOrigin] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const history = useHistory();
    const [showToast, setShowToast] = useState(false);
    const [showToastCancel, setShowToastCancel] = useState(false);

    const handleSubmit = () => {

        if (heading && location && date && category.length > 0 && image) {
            // addEvent(
            //     imagePreview,
            //     heading,
            //     date,
            //     location,
            //     description,
            //     category,
            //     status,
            //     origin
            // );
            window.history.back();
            setShowToast(true);
        } else {
            setShowToastCancel(true);
        }
        // tinggal kasih di null lagi kalo dah submit >> gue redirect ke home dan kasih toast messaage b
        // sementara masih ada yang error kayakny belom geri cek -> foto masih salah juga
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImage(file);

            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };

    const goBack = () => {
        window.history.back();
    };

    useEffect(() => {
        const selectedEvent = eventData.find((event) => event.id === eventId);
        if (selectedEvent) {
            // setEvent(selectedEvent);
            setHeading(selectedEvent.title);
            setLocation(selectedEvent.location);
            setDescription(selectedEvent.description);
            setDate(selectedEvent.date.toISOString().split('T')[0]);
            setCategory(selectedEvent.type ? [selectedEvent.type] : []);
            setStatus(true);
            setOrigin(selectedEvent.organization);
        }
    }, [eventId]);

    return (
        <IonPage>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Event Successfully created!"
                duration={2000}
            />
            <IonToast
                isOpen={showToastCancel}
                onDidDismiss={() => setShowToastCancel(false)}
                message="Please fill every mandatory fields!"
                duration={2000}
            />
            <IonContent fullscreen>
                <div
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
                        height: "80px",
                        borderRadius: "0px 0px 32px 0px",
                        padding: "10px 25px",
                        position: "relative",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        alignItems: "center",
                    }}
                >
                    <IonButtons onClick={goBack}>
                        <IonButton>
                            <IonIcon
                                icon={arrowBack}
                                style={{
                                    color: "white",
                                    fontSize: "20px",
                                }}
                            ></IonIcon>
                        </IonButton>
                    </IonButtons>

                    <IonTitle color="light" style={{ textAlign: "center" }}>
                        Edit Event
                    </IonTitle>
                </div>

                <IonLoading isOpen={loading} />
                <IonAlert
                    isOpen={!!error}
                    message={error}
                    buttons={[
                        {
                            text: "Ok",
                            handler: () => {
                                setError("");
                            },
                        },
                    ]}
                />
                <IonList className="ion-padding">
                    <IonItem>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </IonItem>
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: "100%", maxHeight: "300px", marginTop: "10px" }}
                        />
                    )}
                    <IonInput
                        label="Heading*"
                        labelPlacement="floating"
                        fill="outline"
                        placeholder="Enter heading"
                        value={heading}
                        onIonChange={(e) => setHeading(e.detail.value!)}
                        style={{ marginTop: "10px" }}
                    />
                    <IonInput
                        label="Location*"
                        labelPlacement="floating"
                        fill="outline"
                        placeholder="Enter location"
                        value={location}
                        onIonChange={(e) => setLocation(e.detail.value!)}
                        style={{ marginTop: "10px" }}
                    />
                    <IonInput
                        label="Date*"
                        labelPlacement="floating"
                        fill="outline"
                        type="date"
                        value={date}
                        onIonChange={(e) => setDate(e.detail.value!)}
                        style={{ marginTop: "10px" }}
                    />
                    <IonTextarea
                        label="Description"
                        labelPlacement="floating"
                        fill="outline"
                        placeholder="Enter description"
                        value={description}
                        onIonChange={(e) => setDescription(e.detail.value!)}
                        style={{ marginTop: "10px" }}
                    />
                    <IonSelect
                        label="Category*"
                        labelPlacement="floating"
                        value={category}
                        placeholder="Select category"
                        fill="outline"
                        multiple
                        onIonChange={(e) => setCategory(e.detail.value as string[])}
                        style={{ marginTop: "10px" }}
                    >
                        <IonSelectOption value="Concert">Concert</IonSelectOption>
                        <IonSelectOption value="Webinar">Webinar</IonSelectOption>
                        <IonSelectOption value="Meeting">Meeting</IonSelectOption>
                    </IonSelect>

                    <IonSelect
                        label="Status*"
                        labelPlacement="floating"
                        value={status}
                        fill="outline"
                        placeholder="Select status"
                        onIonChange={(e) => setStatus(e.detail.value)}
                        style={{ marginTop: "10px" }}
                    >
                        <IonSelectOption value="Public">Public</IonSelectOption>
                        <IonSelectOption value="Private">Private</IonSelectOption>
                    </IonSelect>

                    <IonSelect
                        label="Organization*"
                        labelPlacement="floating"
                        value={origin}
                        fill="outline"
                        placeholder="Select origin"
                        onIonChange={(e) => setOrigin(e.detail.value)}
                        style={{ marginTop: "10px" }}
                    >
                        <IonSelectOption value="0">
                            No Organization
                        </IonSelectOption>
                        {organization.map((org) => (
                            <IonSelectOption key={org.code} value={org.code}>
                                {org.name}
                            </IonSelectOption>
                        ))}
                    </IonSelect>

                </IonList>

                <IonButton
                    expand="block"
                    style={{
                        borderRadius: "20px",
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10px",
                        marginRight: "10px",
                        '--background': 'linear-gradient(90deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)',
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={handleSubmit}
                >
                    Create
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default EditEvent;
