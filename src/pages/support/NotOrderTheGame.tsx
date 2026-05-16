import { IonContent, IonPage } from '@ionic/react';
import NotOrderTheGameComponent from '../../components/support/NotOrderTheGameComponent.tsx';

const NotOrderTheGame: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <NotOrderTheGameComponent />
      </IonContent>
    </IonPage>
  );
};

export default NotOrderTheGame;
