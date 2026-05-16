import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Payments from '../../components/payments/payments.tsx';
import Header from '../../components/Header/Header.tsx';


const payment: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <Payments />
      </IonContent>
    </IonPage>
  );
};

export default payment;