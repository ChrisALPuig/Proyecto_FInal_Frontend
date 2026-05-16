import { IonContent, IonPage } from '@ionic/react';
import FaqWebsiteAndAccountsComponent from '../../components/support/StarfaqWebsiteAndAccountsComponent.tsx';

const StarfaqWebsiteAndAccounts: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <FaqWebsiteAndAccountsComponent />
      </IonContent>
    </IonPage>
  );
};

export default StarfaqWebsiteAndAccounts;