import { IonBadge, IonButton, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText } from "@ionic/react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { notificationsOutline, searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { db } from "../firebaseConfig";

interface OrgData {
	id: string;
	data: {
		banner_url: string;
		description: string;
        announcement: string;
		origin: string;
		// Add other properties as per your actual data structure
	};
}

const Organization: React.FC = () => {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState<string>("");
  	const [orgData, setOrgData] = useState<OrgData[]>([
        {
            id: "1",
            data: {
                banner_url: "./images/imkom.png",
                description: "Lorem ipsum dolor sit amet",
                announcement: "Lorem ipsum dolor sit amet",
                origin: "Im'Kom",
            },
        },
        {
            id: "2",
            data: {
                banner_url: "./images/radio.png",
                description: "Lorem ipsum dolor sit amet",
                announcement: "Lorem ipsum dolor sit amet",
                origin: "UMN Radio",
            },
        },
    ]);
    const user = 1;

    const handleCardClick = (orgId: string) => {
		history.push(`/organization/1`);
	};

	const filteredOrgs = orgData.filter((item) =>
		Object.values(item.data).some(
		(value) =>
			typeof value === "string" &&
			value.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	// useEffect(() => {
	// 	async function fetchOrgData() {
	// 		const origin = "your_origin_value"; // Replace 'your_origin_value' with the actual value
	// 		const q = query(collection(db, "organizations"), where("origin", "==", "hmif"));

	// 		try {
	// 			const querySnapshot = await getDocs(q);
	// 			const orgs: any = [];
	// 			querySnapshot.forEach((doc) => {
	// 				// Push each document's data to the orgs array
	// 				orgs.push({ id: doc.id, data: doc.data() });
	// 			});
	// 			setOrgData(orgs); // Set the state with retrieved data
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error);
	// 		}
	// 	}

	// 	fetchOrgData();
	// }, [db]); // Make sure to specify dependencies or leave it empty if it's a one-time fetch

	// Check if orgData is empty or undefined before accessing its properties

	function printData() {
		console.log(orgData);
	}

    var isClick: boolean = false;

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
                    }}>Manage your <br></br> organization!</h1>
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
                <h2>My Organization</h2>
                <IonItem lines="none" className="orgWrapper" onClick={() => handleCardClick("1")}>
                    <IonItem className="orgItem">
                        <IonGrid className="orgGrid">
                            <IonRow>
                                <IonCol>
                                    <img style={{ marginTop: "6px" }} src="./images/imkom.png" />
                                </IonCol>
                                <IonCol size="8">
                                    <h3>Im'Kom</h3>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem className="orgItem">
                        <IonGrid className="orgGrid">
                            <IonRow>
                                <IonCol>
                                    <img style={{ marginTop: "20px" }} src="./images/radio.png" />
                                </IonCol>
                                <IonCol size="8">
                                    <h3>UMN Radio</h3>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem className="orgItem">
                        <IonGrid className="orgGrid">
                            <IonRow>
                                <IonCol>
                                    <img style={{ marginTop: "6px" }} src="./images/imkom.png" />
                                </IonCol>
                                <IonCol size="8">
                                    <h3>Im'Kom</h3>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem className="orgItem">
                        <IonGrid className="orgGrid">
                            <IonRow>
                                <IonCol>
                                    <img style={{ marginTop: "20px" }} src="./images/radio.png" />
                                </IonCol>
                                <IonCol size="8">
                                    <h3>UMN Radio</h3>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonItem>
                
                <h2>Organizations</h2>
                <IonItem lines="none" className="catWrapper">
                    <IonButton 
                        onClick={() => printData()}
                        // color="isClicked() ? 'secondary' : 'primary'" 
                        color="secondary"
                        className="catItem"
                    >
                        <small className="catText">All</small>
                    </IonButton>
                    <IonButton className="catItem">
                        <small className="catText">Himpunan</small>
                    </IonButton>
                    <IonButton className="catItem">
                        <small className="catText">Media Kampus</small>
                    </IonButton>
                    <IonButton className="catItem">
                        <small className="catText">UKM Olahraga</small>
                    </IonButton>
                    <IonButton className="catItem">
                        <small className="catText">UKM Seni</small>
                    </IonButton>
                    <IonButton className="catItem">
                        <small className="catText">UKM Seni</small>
                    </IonButton>
                </IonItem>

                <IonGrid>
                    {orgData.map((item, index) => (
                    <IonCard 
                        key={index}
                        onClick={() => handleCardClick(item.id)}
                        style={{ height: "125px"}}
                    >
                        <IonRow className="ion-text-center" style={{ marginTop: "30px" }}>
                            <IonCol size="4">
                                <img src={item.data.banner_url} />
                            </IonCol>
                            <IonCol size="4">
                                <h3>{item.data.origin}</h3>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                    ))}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Organization;