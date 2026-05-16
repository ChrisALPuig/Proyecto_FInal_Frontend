import { IonContent, IonPage } from '@ionic/react';
import Support from '../../components/support/Support.tsx';


const SupportPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Support />
      </IonContent>
    </IonPage>
  );
};

export default SupportPage;
