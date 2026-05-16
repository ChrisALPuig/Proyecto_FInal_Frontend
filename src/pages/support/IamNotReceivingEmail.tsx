import { IonContent, IonPage } from '@ionic/react';
import IamNotReceivingEmailComponent from '../../components/support/IamNotReceivingEmailComponent.tsx';

const IamNotReceivingEmail: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IamNotReceivingEmailComponent />
      </IonContent>
    </IonPage>
  );
};

export default IamNotReceivingEmail;