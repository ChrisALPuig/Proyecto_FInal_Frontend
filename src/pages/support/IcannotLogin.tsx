import { IonContent, IonPage } from '@ionic/react';
import IcannotLoginComponent from '../../components/support/IcannotLoginComponent.tsx';

const IcannotLogin: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IcannotLoginComponent />
      </IonContent>
    </IonPage>
  );
};

export default IcannotLogin;