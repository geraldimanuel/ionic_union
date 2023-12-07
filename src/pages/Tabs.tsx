import { IonApp, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router";
import { albums, bag, calendar, home, people, person } from "ionicons/icons"
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
            background: "radial-gradient(circle, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)",
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
<<<<<<< HEAD
                    <IonIcon icon={bag} size="small" style={{
                        // color: isClicked ? "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)" : "white",
                        color: "white",
=======
                    <IonIcon icon={people} size="small" style={{
                        color: isClicked ? "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)" : "white",
>>>>>>> features/frontend/kesya
                    }}onClick={handleClick}/>
                    <IonText style={{
                        // color: isClicked ? "linear-gradient(180deg, rgba(18,84,136,1) 0%, rgba(42,147,213,1) 100%)" : "white",
                        color: "white",
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
                    marginBottom:"10px"
				}}>
<<<<<<< HEAD
                    <IonGrid style={{
                        position: "fixed",
						backgroundColor: "#ffffff",
						padding: "10px",
						borderRadius: "30px",
                        // marginBottom: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                    <IonIcon icon={home} size="large" color="primary" style={{
=======
                    <IonIcon icon={home} size="large" color="light" style={{
						background: "linear-gradient(180deg, rgba(42,147,213,1) 0%, rgba(55,202,236,1) 100%)",
						padding: "10px 0px",
						borderRadius: "100%",
                        width:"60px",
>>>>>>> features/frontend/kesya
					}} />
                    </IonGrid>
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
                    <IonIcon icon={person} color="light" size="small"/>
                    <IonText color="light"><b>Profile</b></IonText>
                </IonTabButton>
            </IonTabBar>
            {/* </div> */}
            </IonTabs>

    )
}

export default Tabs;
