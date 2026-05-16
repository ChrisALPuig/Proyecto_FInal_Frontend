import { IonContent, IonPage } from '@ionic/react';
import HowChangeUsernameComponent from '../../components/support/HowChangeUsernameComponent.tsx';

const HowChangeUsername: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowChangeUsernameComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowChangeUsername;