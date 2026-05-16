import { IonContent, IonPage } from '@ionic/react';
import Policies_GeneralnfoComponent from '../../components/support/Policies_GeneralnfoComponent.tsx';

const Policies_Generalnfo: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Policies_GeneralnfoComponent />
      </IonContent>
    </IonPage>
  );
};

export default Policies_Generalnfo;
