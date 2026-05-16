import { IonContent, IonPage } from '@ionic/react';
import HowDeleteAccountComponent from '../../components/support/HowDeleteAccountComponent.tsx';

const HowDeleteAccount: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowDeleteAccountComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowDeleteAccount;