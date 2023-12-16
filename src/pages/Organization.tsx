import {
	IonBadge,
	IonButton,
	IonCard,
	IonCardHeader,
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
import { query, collection, where, getDocs } from "firebase/firestore";
import { notificationsOutline, searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebaseConfig";
import { tr } from "date-fns/locale";

interface OrgData {
	origin_id: string;
	logo_url: string;
	origin_name: string;
	description: string;
	announcement: string;
	type: string;
	admin: string[];
	member: string[];
}

const Organization: React.FC = () => {
	const history = useHistory();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [orgData, setOrgData] = useState<OrgData[]>([]);

	const handleCardClick = (orgId: string) => {
		history.push(`/nav/organization/${orgId}`);
	};

	// const filteredOrgs = orgData.filter((item) =>
	// 	Object.values(item.data).some(
	// 		(value) =>
	// 			typeof value === "string" &&
	// 			value.toLowerCase().includes(searchTerm.toLowerCase())
	// 	)
	// );

	useEffect(() => {
		async function fetchOrganizationData() {
			const q = query(collection(db, "organizations"));

			try {
				const querySnapshot = await getDocs(q);
				const orgData: OrgData[] = [];
				querySnapshot.forEach((doc) => {
					// map one by one
					orgData.push({
						origin_id: doc.id,
						logo_url: doc.data().logo_url,
						origin_name: doc.data().origin_name,
						description: doc.data().description,
						announcement: doc.data().announcement,
						type: doc.data().type,
						admin: doc.data().admin,
						member: doc.data().member,
					});
				});
				setOrgData(orgData);
			} catch (error) {
				console.log(error);
			}
		}

		fetchOrganizationData();
	}, [db]);

	function printData() {
		console.log(orgData);
	}

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
				<div style={{ textAlign: "right", marginTop: "70px" }}></div>
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
				<IonItem
					lines="none"
					className="orgWrapper"
					// onClick={() => handleCardClick("1")}
				>
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
						// <a key={index} href={`/nav/organization/${item.origin_id}`}>
						<IonCard
							key={index}
							style={{ height: "125px" }}
							onClick={() => handleCardClick(item.origin_id)}
						>
							<IonRow className="ion-text-center" style={{ marginTop: "30px" }}>
								<IonCol size="4">
									<img src={item.logo_url} />
								</IonCol>
								<IonCol size="4">
									<h3>{item.origin_name}</h3>
								</IonCol>
							</IonRow>
						</IonCard>
						// </a>
					))}
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Organization;
