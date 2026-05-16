import { IonContent, IonPage } from '@ionic/react';
import HowChangeEmailComponent from '../../components/support/HowChangeEmailComponent.tsx';

const HowChangeEmail: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowChangeEmailComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowChangeEmail;