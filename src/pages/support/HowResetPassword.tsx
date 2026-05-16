import { IonContent, IonPage } from '@ionic/react';
import HowResetPasswordComponent from '../../components/support/HowResetPasswordComponent.tsx';

const HowResetPassword: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowResetPasswordComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowResetPassword;