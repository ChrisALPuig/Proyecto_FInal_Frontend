import { IonContent, IonPage } from '@ionic/react';
import TriedToMakePaymentComponent from '../../components/support/TriedToMakePaymentComponent.tsx';

const TriedToMakePayment: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <TriedToMakePaymentComponent />
      </IonContent>
    </IonPage>
  );
};

export default TriedToMakePayment;