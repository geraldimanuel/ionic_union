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
import {
	query,
	collection,
	where,
	getDocs,
	getDoc,
	doc,
	onSnapshot,
} from "firebase/firestore";
import { notificationsOutline, searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebaseConfig";
import { tr } from "date-fns/locale";
import { getAuth } from "firebase/auth";

import "./Home.css";

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
	const [myOrg, setMyOrg] = useState<OrgData[]>([]);

	const auth = getAuth();

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

	const [loggedName, setLoggedName] = useState<string>("");

	useEffect(() => {
		// find user name from database that have uid same as auth.currentUser.uid

		const uid = auth.currentUser?.uid;
		console.log(uid);

		if (uid) {
			const q = getDoc(doc(db, "users", uid));

			async function fetchUserName() {
				const docSnap = await q;
				const userName = docSnap.data()?.name;
				setLoggedName(userName);
			}

			fetchUserName();
		}
	}, [db]);
	useEffect(() => {
		const fetchOrganizationData = () => {
		  const q = query(collection(db, "organizations"));
	  
		  const unsubscribe = onSnapshot(q, (querySnapshot) => {
			try {
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
			  console.error("Error fetching organization data:", error);
			}
		  });
	  
		  // Clean up the organization listener when the component unmounts
		  return () => {
			unsubscribe();
		  };
		};
	  
		fetchOrganizationData();
	  }, [db]);
	  
	  useEffect(() => {
		// get all organizations data where logged user in member array
	  
		const q = query(
		  collection(db, "organizations"),
		  where("members", "array-contains", auth.currentUser?.email)
		);
	  
		const fetchMyOrganizationData = () => {
		  const unsubscribe = onSnapshot(q, (querySnapshot) => {
			try {
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
			  setMyOrg(orgData);
			} catch (error) {
			  console.error("Error fetching user's organization data:", error);
			}
		  });
	  
		  // Clean up the user's organization listener when the component unmounts
		  return () => {
			unsubscribe();
		  };
		};
	  
		fetchMyOrganizationData();
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
					<p>Hello, {loggedName}!</p>
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
				<IonItem lines="none" className="orgWrapper">
					{myOrg.map((item, index) => (
						<IonItem
							key={index}
							className="orgItem"
							onClick={() => handleCardClick(item.origin_id)}
							style={{ dropShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
						>
							<IonGrid className="orgGrid">
								<IonRow>
									<IonCol>
										<img style={{ marginTop: "6px" }} src={item?.logo_url} />
									</IonCol>
									<IonCol size="8">
										<h3>{item?.origin_name}</h3>
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonItem>
					))}
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
							<IonRow className="ion-text-center">
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
