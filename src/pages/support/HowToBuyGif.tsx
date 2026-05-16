import { IonContent, IonPage } from '@ionic/react';
import HowToBuyGifComponent from '../../components/support/HowToBuyGifComponent.tsx';

const HowToBuyGif: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowToBuyGifComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowToBuyGif;
