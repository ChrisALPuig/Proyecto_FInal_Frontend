import { IonContent, IonPage } from '@ionic/react';
import AdditionalFeeComponent from '../../components/support/AdditionalFeeComponent.tsx';

const AdditionalFee: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <AdditionalFeeComponent />
      </IonContent>
    </IonPage>
  );
};

export default AdditionalFee;
