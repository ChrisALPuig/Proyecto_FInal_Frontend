import { IonContent, IonPage } from '@ionic/react';
import EmailFromCgLooksSuspiciousPhishingComponent from '../../components/support/StaremailFromCgLooksSuspiciousPhishingComponent.tsx';

const StaremailFromCgLooksSuspiciousPhishing: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <EmailFromCgLooksSuspiciousPhishingComponent />
      </IonContent>
    </IonPage>
  );
};

export default StaremailFromCgLooksSuspiciousPhishing;