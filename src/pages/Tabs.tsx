import { IonApp, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar, useIonRouter } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router";
import { albums, bag, calendar, home, people, person } from "ionicons/icons"
import { Link, Redirect, Route, useLocation } from "react-router-dom";
import Organization from "./Organization";
import OrganizationDetail from "./OrganizationDetail";
import Event from "./Event";
import EventDetail from "./EventDetail";
import EditOrganization from "./EditOrganization";
import { useHistory } from "react-router-dom";
import { useEffect, useState} from "react";


const Tabs: React.FC = () => {
    
    const history = useHistory();
    const router = useIonRouter();
    const [isClicked, setIsClicked] = useState<boolean>(false);


        const tabStyle = {
            borderRadius: "20px",
            position: "floating",
            padding: "10px",
            bottom: "20px",
            marginBottom: "15px",
            marginLeft: "10px",
            marginRight: "10px",
            background: "radial-gradient(circle, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
            boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }

        
        const location = useLocation();
        return(
            <IonTabs>
            <IonRouterOutlet>
                <Redirect path="/" to ="/home" />
                <Route exact path="/organization/:id" component={OrganizationDetail} />
                <Route exact path="/organization" component={Organization} />
                <Route exact path="/events/:id" component={EventDetail} />
                <Route exact path="/events" component={Event} />
                <Route exact path="/editorganization" component={EditOrganization} />
                {/* <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/profile" component={Profile} /> */}
            </IonRouterOutlet>

			<IonTabBar slot="bottom" className="container" style={tabStyle}>
            
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
                <IonTabButton tab="home" href="/organization" style={{
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



export default Tabs;
