import { IonContent, IonPage } from '@ionic/react';
import OrderPaymentsComponent from '../../components/support/OrdersPaymentsComponent.tsx';
import AccountStoreComponent from '../../components/support/AccountStoreComponent.tsx';


const AccountStore: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <AccountStoreComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccountStore;
