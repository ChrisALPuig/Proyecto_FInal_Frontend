import { IonContent, IonPage } from '@ionic/react';
import IchargedMyGameComponent from '../../components/support/IchargedMyGameComponent.tsx';

const IchargedMyGame: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IchargedMyGameComponent />
      </IonContent>
    </IonPage>
  );
};

export default IchargedMyGame;
