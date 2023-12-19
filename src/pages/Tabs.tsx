import {
	IonApp,
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { albums, bag, calendar, home, people, person } from "ionicons/icons";
import { Link, Redirect, Route } from "react-router-dom";
import Organization from "./Organization";
import OrganizationDetail from "./OrganizationDetail";
import Event from "./Event";
import CreateEvent from "./CreateEvent";
import CreateOrganization from "./CreateOrganization";
import Home from "./LandingPage";
import EventDetail from "./EventDetail";
import EditOrganization from "./EditOrganization";
import EditEvent from "./EditEvent";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Calendar from "./Calendar";
import EditProfile from "./EditProfile";
import Request from "./Request";

const Tabs: React.FC = () => {
	const history = useHistory();
	const auth = getAuth();

	const [isClicked, setIsClicked] = useState<boolean>(false);

	const tabStyle = {
		borderRadius: "20px",
		position: "floating",
		padding: "10px",
		bottom: "20px",
		marginBottom: "15px",
		marginLeft: "10px",
		marginRight: "10px",
		background:
			"radial-gradient(circle, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
		boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log("User is signed in");
			} else {
				console.log("User is not signed in");
				history.push("/login");
			}
		});

		return () => {
			// Clean up the listener to avoid memory leaks
			unsubscribe();
		};
	}, []);

	return (
		<IonTabs>
			<IonRouterOutlet>
				<Redirect exact path="/nav" to="/nav/home" />
				<Route exact path="/nav/home" component={Home} />

				<Route exact path="/nav/organization" component={Organization} />
				<Route path="/nav/organization/:id" component={OrganizationDetail} />

				<Route exact path="/nav/events" component={Event} />
				<Route path="/nav/events/:id" component={EventDetail} />

				<Route
					exact
					path="/nav/editorganization"
					component={EditOrganization}
				/>

				<Route
					exact
					path="/nav/editorganization/:id"
					component={EditOrganization}
				/>

				<Route
					exact
					path="/nav/editevent"
					component={EditEvent}
				/>

				<Route
					exact
					path="/nav/editevent/:id"
					component={EditEvent}
				/>

				<Route exact path="/nav/profile" component={Profile} />
				<Route exact path="/nav/calendar" component={Calendar} />
				<Route exact path="/nav/profile" component={Profile} />

				{/* <Route exact path="/events/edit/:id" component={EditEvent} /> */}
				<Route exact path="/request" component={Request} />
				<Route exact path="/editprofile" component={EditProfile} />
			</IonRouterOutlet>

			<IonTabBar
				slot="bottom"
				style={{
					borderRadius: "20px",
					position: "floating",
					padding: "10px",
					bottom: "20px",
					marginBottom: "15px",
					marginLeft: "10px",
					marginRight: "10px",
					background:
						"radial-gradient(circle, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
					boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					display: "flex",
					justifyContent: "space-around",
					width: "auto",
				}}
			>
				<IonTabButton
					tab="organization"
					href="/nav/organization"
					style={{
						background: "transparent",
					}}
				>
					<IonIcon
						icon={people}
						size="small"
						style={{
							color:
								location.pathname === "/nav/organization" ? "#75e8ff" : "white",
						}}
					/>
					<IonText
						style={{
							color:
								location.pathname === "/nav/organization" ? "#75e8ff" : "white",
						}}
					>
						<b>Organization</b>
					</IonText>
				</IonTabButton>
				<IonTabButton
					tab="events"
					href="/nav/events"
					style={{
						background: "transparent",
					}}
				>
					<IonIcon
						icon={albums}
						size="small"
						style={{
							color: location.pathname === "/nav/events" ? "#75e8ff" : "white",
						}}
					/>
					<IonText
						color="light"
						style={{
							color: location.pathname === "/nav/events" ? "#75e8ff" : "white",
						}}
					>
						<b>Events</b>
					</IonText>
				</IonTabButton>
				<IonTabButton
					tab="home"
					href="/nav/home"
					style={{
						background: "transparent",
						marginBottom: "10px",
					}}
				>
					<IonIcon
						icon={home}
						size="large"
						color="light"
						style={{
							background:
								"linear-gradient(180deg, rgba(42,147,213,1) 0%, rgba(55,202,236,1) 100%)",
							padding: "10px 0px",
							borderRadius: "100%",
							width: "60px",
						}}
					/>
				</IonTabButton>
				<IonTabButton
					tab="calendar"
					href="/nav/calendar"
					style={{
						background: "transparent",
					}}
				>
					<IonIcon
						icon={calendar}
						size="small"
						style={{
							color:
								location.pathname === "/nav/calendar" ? "#75e8ff" : "white",
						}}
					/>
					<IonText
						color="light"
						style={{
							color:
								location.pathname === "/nav/calendar" ? "#75e8ff" : "white",
						}}
					>
						<b>Calendar</b>
					</IonText>
				</IonTabButton>
				<IonTabButton
					tab="profile"
					href="/nav/profile"
					style={{
						background: "transparent",
					}}
				>
					<IonIcon
						icon={person}
						size="small"
						style={{
							color: location.pathname === "/nav/profile" ? "#75e8ff" : "white",
						}}
					/>
					<IonText
						color="light"
						style={{
							color: location.pathname === "/nav/profile" ? "#75e8ff" : "white",
						}}
					>
						<b>Profile</b>
					</IonText>
				</IonTabButton>
			</IonTabBar>
			{/* </div> */}
		</IonTabs>
	);
};

export default Tabs;
