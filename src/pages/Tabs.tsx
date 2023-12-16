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
import { useState } from "react";
import Profile from "./Profile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Calendar from "./Calendar";
import EditProfile from "./EditProfile";

const Tabs: React.FC = () => {
	const history = useHistory();
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const handleClick = () => {
		setIsClicked(true);
		history.push("/organization");
	};

	const auth = getAuth();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log("User is signed in");
			// setIsLogged(true);
		}
		// User is signed out
		else console.log("User is not signed in");
	});

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
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Redirect exact path="/nav" to="/nav/home" />
				<Route exact path="/nav/home" component={Home} />
				<Route
					exact
					path="/nav/createorganization"
					component={CreateOrganization}
				/>
				<Route exact path="/nav/createevent" component={CreateEvent} />

				<Route exact path="/nav/organization" component={Organization} />
				<Route path="/nav/organization/:id" component={OrganizationDetail} />

				<Route exact path="/nav/events" component={Event} />
				<Route path="/nav/events/:id" component={EventDetail} />

				<Route
					exact
					path="/nav/editorganization"
					component={EditOrganization}
				/>
				<Route exact path="/nav/profile" component={Profile} />
				<Route exact path="/nav/calendar" component={Calendar} />
				<Route exact path="/nav/profile" component={Profile} />
				<Route exact path="/nav/editprofile" component={EditProfile} />
			</IonRouterOutlet>

			<IonTabBar slot="bottom" className="container" style={tabStyle}>
				<IonTabButton
					tab="events"
					href="/nav/organization"
					style={{
						background: "transparent",
					}}
				>
					<IonIcon
						icon={people}
						size="small"
						style={{
							color: isClicked
								? "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)"
								: "white",
						}}
						onClick={handleClick}
					/>
					<IonText
						style={{
							color: isClicked
								? "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)"
								: "white",
						}}
						onClick={handleClick}
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
					<IonIcon icon={albums} color="light" size="small" />
					<IonText color="light">
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
					<IonIcon icon={calendar} color="light" size="small" />
					<IonText color="light">
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
					<IonIcon icon={person} color="light" size="small" />
					<IonText color="light">
						<b>Profile</b>
					</IonText>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default Tabs;
