import { IonContent, IonPage } from '@ionic/react';
import HowToPayComponent from '../components/support/HowToPayComponente.tsx';
import HowToChangeCurrencyComponent from '../components/support/HowToChangeCurrencyComponent.tsx';

const HowToChangeCurrency: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowToChangeCurrencyComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowToChangeCurrency;
