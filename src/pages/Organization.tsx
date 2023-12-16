import { IonBadge, IonButton, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText } from "@ionic/react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { notificationsOutline, searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { db } from "../firebaseConfig";

interface OrgData {
	id: string;
	data: {
		logo_url: string;
		description: string;
        announcement: string;
		origin_name: string;
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
                logo_url: "./images/imkom.png",
                description: "Lorem ipsum dolor sit amet",
                announcement: "Lorem ipsum dolor sit amet",
                origin_name: "Im'Kom",
            },
        },
        {
            id: "2",
            data: {
                logo_url: "./images/radio.png",
                description: "Lorem ipsum dolor sit amet",
                announcement: "Lorem ipsum dolor sit amet",
                origin_name: "UMN Radio",
            },
        },
    ]);

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

	useEffect(() => {
		async function fetchOrganizationData() {
			const origin = "your_origin_value"; // Replace 'your_origin_value' with the actual value
			const getOrgs = query(collection(db, "organizations"), where("origin", "==", "hmif"));

			try {
				const querySnapshot = await getDocs(getOrgs);
				const orgs: any = [];
				querySnapshot.forEach((doc) => {
					// Push each document's data to the events array
					orgs.push({ id: doc.id, data: doc.data() });
				});
				setOrgData(orgs); // Set the state with retrieved data
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

        // fetchOrganizationData(); masih kosong
	}, [db]); 

	function printData() {
		console.log(orgData);
	}

    return (
        <IonPage style={{backgroundColor:"DBDBDB"}}>
			<div style={{
                background:"linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)", 
                height:"261px", 
                borderRadius:"0px 0px 32px 32px",
                padding:"10px 25px",
                position:"relative",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                    <div style={{ textAlign: "right", marginTop:"70px" }}>
                    </div>
				<IonText color="light">
					<p>Hello, Bella!</p>
					<h1
						style={{
							fontSize: "32px",
						}}
					>
						Let's find your <br></br> favorite organization!
					</h1>
				</IonText>
				<IonItem
					style={{
						top: "30px",
						borderRadius: "28px",
						height: "56px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					}}
				>
					<IonLabel>
						<IonIcon icon={searchOutline} />
					</IonLabel>
					<IonInput
						style={{ left: "5px", borderRadius: "28px", height: "56px" }}
						type="text"
						placeholder="Search here. . ."
						value={searchTerm}
						onIonChange={(e) => setSearchTerm(e.detail.value!)}
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
                    {filteredOrgs.map((item, index) => (
                        <IonCard 
                            key={index}
                            onClick={() => handleCardClick(item.id)}
                            style={{ height: "125px"}}
                        >
                            <IonRow className="ion-text-center" style={{ marginTop: "30px" }}>
                                <IonCol size="4">
                                    <img src={item.data.logo_url} />
                                </IonCol>
                                <IonCol size="4">
                                    <h3>{item.data.origin_name}</h3>
                                </IonCol>
                            </IonRow>
                        </IonCard>
                        ))
                    }
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Organization;