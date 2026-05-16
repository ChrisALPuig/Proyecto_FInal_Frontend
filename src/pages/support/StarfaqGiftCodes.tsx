import { IonContent, IonPage } from '@ionic/react';
import FaqGiftCodesComponent from '../../components/support/StarfaqGiftCodesComponent.tsx';

const StarfaqGiftCodes: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <FaqGiftCodesComponent />
      </IonContent>
    </IonPage>
  );
};

export default StarfaqGiftCodes;