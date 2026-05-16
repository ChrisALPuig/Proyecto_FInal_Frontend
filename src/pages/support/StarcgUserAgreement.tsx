import { IonContent, IonPage } from '@ionic/react';
import CgUserAgreementComponent from '../../components/support/StarcgUserAgreementComponent.tsx';

const StarcgUserAgreement: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <CgUserAgreementComponent />
      </IonContent>
    </IonPage>
  );
};

export default StarcgUserAgreement;