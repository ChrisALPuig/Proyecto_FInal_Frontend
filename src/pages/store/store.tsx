import { IonContent, IonHeader, IonPage } from '@ionic/react';
import Header from '../../components/Header/Header';
import StoreComponent from '../../components/store/storeComponent';

const Store: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="header-fixed">
        <Header />
      </IonHeader>
      <IonContent fullscreen>
        <StoreComponent />
      </IonContent>
    </IonPage>
  );
};

export default Store;
