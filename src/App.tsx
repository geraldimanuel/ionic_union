import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Event from "./pages/Event";
import EventDetail from "./pages/EventDetail";

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

import { onAuthStateChanged } from "@firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Organization from "./pages/Organization";
import OrganizationDetail from "./pages/OrganizationDetail";
import Tabs from "./pages/Tabs";

setupIonicReact();

const App: React.FC = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet id="main">
					<Redirect exact from="/" to="/organization" />
					<Route path="/" component={Tabs} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/admin" component={Admin} />
					<Route exact path="/event" component={Event} />
					<Route exact path="/event/:id" component={EventDetail} />
					{/* <Route exact path="/organization" component={Organization} /> */}
					<Route exact path="/organization/:id" component={OrganizationDetail} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
