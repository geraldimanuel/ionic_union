import { IonApp, IonContent, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router";
import { albums, bag, calendar, home, people } from "ionicons/icons"
import { Link, Redirect, Route } from "react-router-dom";
import Organization from "./Organization";
import OrganizationDetail from "./OrganizationDetail";
import Event from "./Event";
import EventDetail from "./EventDetail";
import EditOrganization from "./EditOrganization";
import { useHistory } from "react-router-dom";
import { useState} from "react";


const Tabs: React.FC = () => {
    
    const history = useHistory();
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClick = () => {
        setIsClicked(true);
        history.push("/organization");
    }

        const tabStyle = {
            borderRadius: "20px",
            position: "floating",
            padding: "10px",
            bottom: "20px",
            marginBottom: "15px",
            marginLeft: "10px",
            marginRight: "10px",
            background: "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
            boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }
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
            
                <IonTabButton tab="organization" href="/organization" style={{
                    background: "transparent",
                }}>
                    <IonIcon icon={bag} size="small" style={{
                        color: isClicked ? "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)" : "white",
                    }}onClick={handleClick}/>
                    <IonText style={{
                        color: isClicked ? "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)" : "white",
                    }}onClick={handleClick}><b>Organization</b></IonText>
                </IonTabButton>
                <IonTabButton tab="events" href="/events" style={{
                    background: "transparent",
                }}>
                    <IonIcon icon={albums} color="light" size="small"/>
                    <IonText color="light"><b>Events</b></IonText>
                </IonTabButton>
                <IonTabButton tab="home" href="/organization" style={{
					background: "transparent",
				}}>
                    <IonIcon icon={home} size="large" color="primary" style={{
						backgroundColor: "#fff",
						padding: "10px",
						borderRadius: "20px",
						
					}} />
                </IonTabButton>
                <IonTabButton tab="calendar" href="/calendar" style={{
                    background: "transparent",
                }}>
                    <IonIcon icon={calendar} color="light" size="small"/>
                    <IonText color="light"><b>Calendar</b></IonText>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile" style={{
                    background: "transparent",
                }}>
                    <IonIcon icon={people} color="light" size="small"/>
                    <IonText color="light"><b>Profile</b></IonText>
                </IonTabButton>
            </IonTabBar>
            {/* </div> */}
            </IonTabs>

    )
}

export default Tabs;
