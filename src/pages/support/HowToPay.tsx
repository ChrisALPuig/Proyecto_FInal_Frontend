import { IonContent, IonPage } from '@ionic/react';
import HowToPayComponent from '../../components/support/HowToPayComponente.tsx';

const HowToPay: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowToPayComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowToPay;
