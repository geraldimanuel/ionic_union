import { Redirect } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Event from "./pages/Event";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import CreateOrganization from "./pages/CreateOrganization";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Admin from "./pages/Admin";

import { onAuthStateChanged, getAuth } from "@firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Organization from "./pages/Organization";
import OrganizationDetail from "./pages/OrganizationDetail";
import Tabs from "./pages/Tabs";
import EditOrganization from "./pages/EditOrganization";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";

import EditProfile from "./pages/EditProfile";
import Request from "./pages/Request";
import { Storage } from "@capacitor/storage";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";

setupIonicReact();

const App: React.FC = () => {
	const history = useHistory();
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const checkTokenInStorage = async () => {
			const { value } = await Storage.get({ key: "authToken" });
			return value;
		};

		const initializeApp = async () => {
			const authToken = await checkTokenInStorage();
			if (authToken) {
				setAuthenticated(true);
				console.log("authenticated");
			}
		};

		initializeApp();
	}, []);

	return (
		<Router>
			<IonApp>
				<IonReactRouter>
					<IonRouterOutlet id="main">
						<Redirect exact from="/" to={authenticated ? "/nav" : "/login"} />
						<Route path="/nav" component={Tabs} />

						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<Route path="/admin" component={Admin} />
						{/* <Route path="/event" component={Event} />
					<Route path="/event" component={Event} />
					<Route path="/event/1" component={EventDetail} /> */}
						{/* <Route exact path="/organization" component={Organization} /> */}
						{/* <Route path="/organization/:id" component={OrganizationDetail} /> */}
						{/* <Route  path="/editorganization" component={EditOrganization} /> */}
						{/* <Route path="/calendar" component={Calendar} /> */}

						<Route
							exact
							path="/nav/createorganization"
							component={CreateOrganization}
						/>
						<Route exact path="/nav/createevent" component={CreateEvent} />
					</IonRouterOutlet>
				</IonReactRouter>
			</IonApp>
		</Router>
	);
};

export default App;
