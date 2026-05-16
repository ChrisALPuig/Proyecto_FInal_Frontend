import { IonContent, IonPage } from '@ionic/react';
import HowCanIRecoverAccessComponent from '../../components/support/HowCanIRecoverAccessComponent.tsx';

const HowCanIRecoverAccess: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowCanIRecoverAccessComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowCanIRecoverAccess;