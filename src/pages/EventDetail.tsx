import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
    IonIcon,
	IonTitle,
    IonText,
    IonBadge,
	IonToolbar,
    IonItem,
    IonLabel,
    IonCard,
    IonGrid,
    IonRow,
    IonCol
} from "@ionic/react";
import { notificationsOutline, searchOutline, calendarClearOutline, locationOutline, appsOutline } from 'ionicons/icons';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EventDetail: React.FC = () => {

    const data = [
        {
          title: "JOLLITY: Closing Concert COMMFEST UMN 2023",
          date: "Saturday, Nov 11, 2023",
          time: "15.30 WIB - Selesai",
          location: "Lapangan Universitas Multimedia Nusantara"
        },
      ];

	return (
		<IonPage style={{backgroundColor:"DBDBDB"}}>
           
			<IonContent style={{top:"40px"}} className="ion-padding">
                    Ini Page Detail
			</IonContent>
		</IonPage>
	);
};

export default EventDetail;
