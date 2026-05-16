import { IonContent, IonPage } from '@ionic/react';
import OrderPaymentsComponent from '../../components/support/OrdersPaymentsComponent.tsx';


const OrderPayments: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <OrderPaymentsComponent />
      </IonContent>
    </IonPage>
  );
};

export default OrderPayments;
