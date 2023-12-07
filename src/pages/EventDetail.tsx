import React from "react";
import {
	IonContent,
	IonIcon,
	IonGrid,
	IonRow,
	IonPage,
	IonText,
	IonButton,
	IonButtons,
} from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import {
	calendarClearOutline,
	locationOutline,
	arrowBackOutline,
} from "ionicons/icons";

const EventDetail: React.FC = () => {
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
							marginTop: "100px",
						}}
					>
						<IonText color="light">
							<h1>JOLLITY: Closing Concert COMMFEST UMN 2023</h1>
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
							<small style={{ marginLeft: "10px" }}>
								Saturday, Nov 11, 2023 (15.30 WIB - Selesai)
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
								Lapangan Parkir FH UMN
							</small>
						</div>
					</IonText>
					<IonText>
						<p style={{ textAlign: "justify", marginTop: "20px" }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui
							nunc mattis enim ut. Dictum non consectetur a erat nam. Placerat
							in egestas erat imperdiet sed. Sed tempus urna et pharetra
							pharetra massa. Nunc mattis enim ut tellus elementum sagittis
							vitae et leo. Pellentesque diam volutpat commodo sed egestas
							egestas fringilla phasellus faucibus. Tortor aliquam nulla
							facilisi cras fermentum odio. Sagittis eu volutpat odio facilisis
							mauris. Fermentum odio eu feugiat pretium. Nisl purus in mollis
							nunc sed id. Scelerisque eu ultrices vitae auctor eu augue.
							Iaculis urna id volutpat lacus laoreet. Nec sagittis aliquam
							malesuada bibendum arcu vitae. Adipiscing tristique risus nec
							feugiat in fermentum posuere urna. Auctor elit sed vulputate mi.
						</p>
						<p style={{ textAlign: "justify" }}>
							Vestibulum mattis ullamcorper velit sed ullamcorper morbi
							tincidunt ornare massa. Malesuada pellentesque elit eget gravida
							cum sociis natoque penatibus et. Blandit turpis cursus in hac
							habitasse. Sagittis orci a scelerisque purus semper eget duis at
							tellus. Mauris pharetra et ultrices neque ornare aenean euismod.
							Augue mauris augue neque gravida in. Hendrerit dolor magna eget
							est lorem ipsum dolor. Vitae purus faucibus ornare suspendisse sed
							nisi lacus sed viverra. Tincidunt dui ut ornare lectus sit amet.
							Lacus vel facilisis volutpat est velit. Aliquet bibendum enim
							facilisis gravida neque convallis a. Volutpat maecenas volutpat
							blandit aliquam etiam. Enim neque volutpat ac tincidunt vitae
							semper quis. Pulvinar elementum integer enim neque volutpat ac
							tincidunt vitae. Quis blandit turpis cursus in hac habitasse
							platea dictumst.
						</p>
					</IonText>
					<div
						style={{
							marginTop: "10px",
							display: "flex",
							flexDirection: "row",
							gap: "40px",
							alignItems: "center",
							justifyContent: "center",
							marginBottom: "15px",
						}}
					>
						<IonButton
							color="secondary"
							style={{ borderRadius: "10px", width: "146px" }}
						>
							Attend
						</IonButton>
						<IonButton
							color="danger"
							style={{ borderRadius: "10px", width: "146px" }}
						>
							Decline
						</IonButton>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default EventDetail;
