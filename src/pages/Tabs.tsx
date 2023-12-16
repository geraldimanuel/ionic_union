<<<<<<< HEAD
import { IonApp, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar, useIonRouter } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router";
import { albums, bag, calendar, home, people, person } from "ionicons/icons"
import { Link, Redirect, Route, useLocation } from "react-router-dom";
=======
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
>>>>>>> features/backend/auth
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
<<<<<<< HEAD
import Calendar from "./Calendar";
import Profile from "./Profile";
import { useEffect, useState} from "react";
import Request from "./Request";
import EditProfile from "./EditProfile";


const Tabs: React.FC = () => {
    
    const history = useHistory();
    const router = useIonRouter();
    const [isClicked, setIsClicked] = useState<boolean>(false);


        const tabStyle = {
            // display: "flex",
            // justifyContent: "center",
            // borderRadius: "20px",
            // position: "floating",
            // padding: "10px",
            // bottom: "20px",
            // marginBottom: "15px",
            // marginLeft: "10px",
            // marginRight: "10px",
            // background: "radial-gradient(circle, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
            // boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }
        
        const location = useLocation();
        return(
            <IonTabs>
            <IonRouterOutlet>
                <Redirect path="/" to ="/home" />
                <Route exact path="/home" component={Home} />
                <Route exact path="/createorganization" component={CreateOrganization} />
				<Route exact path="/createevent" component={CreateEvent} />
                <Route exact path="/organization/:id" component={OrganizationDetail} />
                <Route exact path="/organization" component={Organization} />
                <Route exact path="/events/edit/:id" component={EditEvent} />
                <Route exact path="/events/:id" component={EventDetail} />
                <Route exact path="/events" component={Event} />
                <Route exact path="/editorganization" component={EditOrganization} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/editorganization/:id" component={EditOrganization} />
                <Route exact path="/request" component={Request} />
                <Route exact path="/editprofile" component={EditProfile} />
            </IonRouterOutlet>
                {/* <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/profile" component={Profile} /> */}

			<IonTabBar slot="bottom" style={{

                borderRadius: "20px",
                position: "floating",
                padding: "10px",
                bottom: "20px",
                marginBottom: "15px",
                marginLeft: "10px",
                marginRight: "10px",
                background: "radial-gradient(circle, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
                boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-around",
                width: "auto",
            }}>
                <IonTabButton tab="organization" href="/organization"  style={{
                    background: "transparent",
                }}>
                    <IonIcon icon={people} size="small" style={{
                        color: location.pathname === "/organization" ? "#75e8ff" : "white",
                    }}/>
                    <IonText style={{
                        color: location.pathname === "/organization" ? "#75e8ff" : "white",
                    }}><b>Organization</b></IonText>
                </IonTabButton>
                <IonTabButton tab="events" href="/events" style={{
                    background: "transparent",
                }}>
                    <IonIcon icon={albums} 
                    size="small" style={{
                        color: location.pathname === "/events" ? "#75e8ff" : "white",
                    }}/>
                    <IonText color="light" style={{
                        color: location.pathname === "/events" ? "#75e8ff" : "white",
                    }}><b>Events</b></IonText>
                </IonTabButton>
                <IonTabButton tab="home" href="/home" style={{
					background: "transparent",
                    marginBottom:"10px"
				}}>
                    <IonIcon icon={home} size="large" color="light" style={{
						background: "linear-gradient(180deg, rgba(42,147,213,1) 0%, rgba(55,202,236,1) 100%)",
						padding: "10px 0px",
						borderRadius: "100%",
                        width:"60px",
					}} />
                </IonTabButton>
                <IonTabButton tab="calendar" href="/calendar" style={{
                    background: "transparent",
                }}>
                    <IonIcon icon={calendar} size="small" style={{
                        color: location.pathname === "/calendar" ? "#75e8ff" : "white",
                    }}/>
                    <IonText color="light" style={{
                        color: location.pathname === "/calendar" ? "#75e8ff" : "white",
                    }}><b>Calendar</b></IonText>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile" style={{
                    background: "transparent",
                }}>
                    <IonIcon icon={person} size="small" style={{
                        color: location.pathname === "/profile" ? "#75e8ff" : "white",
                    }}/>
                    <IonText color="light" style={{
                        color: location.pathname === "/profile" ? "#75e8ff" : "white",
                    }}><b>Profile</b></IonText>
                </IonTabButton>
            </IonTabBar>
            {/* </div> */}
            </IonTabs>

    )
    }


=======
import { useState } from "react";
import Profile from "./Profile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Calendar from "./Calendar";

const Tabs: React.FC = () => {
	const history = useHistory();
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const handleClick = () => {
		setIsClicked(true);
		history.push("/organization");
	};

	// const [isLogged, setIsLogged] = useState<boolean>(false);
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
			{/* </div> */}
		</IonTabs>
	);
};
>>>>>>> features/backend/auth

export default Tabs;
