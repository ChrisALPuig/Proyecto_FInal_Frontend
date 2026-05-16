import { IonContent, IonPage } from '@ionic/react';
import OrderSettings from '../../components/support/Order&Settings.tsx';
import Header from '../../components/Header/Header.tsx';

const OrdersSettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#07070c' } as React.CSSProperties}>
        <Header />
        <OrderSettings />
      </IonContent>
    </IonPage>
  );
};

export default OrdersSettingsPage;
