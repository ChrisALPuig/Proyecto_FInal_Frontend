import { IonContent, IonPage } from '@ionic/react';
import CgVoluntaryRefundPolicyComponent from '../../components/support/StarcgVoluntaryRefundPolicyComponent.tsx';

const StarcgVoluntaryRefundPolicy: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <CgVoluntaryRefundPolicyComponent />
      </IonContent>
    </IonPage>
  );
};

export default StarcgVoluntaryRefundPolicy;