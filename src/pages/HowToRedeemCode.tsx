import { IonContent, IonPage } from '@ionic/react';
import HowToPayComponent from './support/HowToPay.tsx';
import HowToRedeemCodePageComponent from '../components/support/HowToRedeemCodeComponent.tsx';

const HowToRedeemCodePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowToRedeemCodePageComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowToRedeemCodePage;