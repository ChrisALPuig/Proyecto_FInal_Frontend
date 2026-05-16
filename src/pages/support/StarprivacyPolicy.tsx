import { IonContent, IonPage } from '@ionic/react';
import PrivacyPolicyComponent from '../../components/support/StarprivacyPolicyComponent.tsx';

const StarprivacyPolicy: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <PrivacyPolicyComponent />
      </IonContent>
    </IonPage>
  );
};

export default StarprivacyPolicy;