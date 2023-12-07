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
import { addOrganization } from "../firebaseConfig";
import { useHistory } from 'react-router-dom';

const CreateOrganization: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [description, setDescription] = useState("");
    const [announcement, setAnnouncement] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [status, setStatus] = useState("");
    const [origin, setOrigin] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const history = useHistory();
    const [showToast, setShowToast] = useState(false);
    const [showToastCancel, setShowToastCancel] = useState(false);

    const handleSubmit = () => {
        if (name && category.length > 0) {
            addOrganization(
                "test",
                imagePreview,
                name,
                description,
                announcement,
                category,
                ["admin"]
            );

            history.push('/home');
            setShowToast(true);
        } else {
            setShowToastCancel(true);
        }
        // belom error handling pasti masih error, image masih belom konek firestore juga
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
                        Create Organization
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
                        label="Name*"
                        labelPlacement="floating"
                        fill="outline"
                        placeholder="Enter name"
                        value={name}
                        onIonChange={(e) => setName(e.detail.value!)}
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
                    <IonTextarea
                        label="Announcement"
                        labelPlacement="floating"
                        fill="outline"
                        placeholder="Enter announcement"
                        value={description}
                        onIonChange={(e) => setAnnouncement(e.detail.value!)}
                        style={{ marginTop: "10px" }}
                    />
                    <IonSelect
                        label="Category*"
                        labelPlacement="floating"
                        fill="outline"
                        value={category}
                        placeholder="Select category"
                        onIonChange={(e) => setCategory(e.detail.value as string[])}
                        style={{ marginTop: "10px" }}
                    >
                        <IonSelectOption value="1">Himpunan</IonSelectOption>
                        <IonSelectOption value="2">UKM</IonSelectOption>
                        <IonSelectOption value="3">Media Kampus</IonSelectOption>
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

export default CreateOrganization;
