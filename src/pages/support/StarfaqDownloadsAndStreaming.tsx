import { IonContent, IonPage } from '@ionic/react';
import FaqDownloadsAndStreamingComponent from '../../components/support/StarfaqDownloadsAndStreamingComponent.tsx';

const StarfaqDownloadsAndStreaming: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <FaqDownloadsAndStreamingComponent />
      </IonContent>
    </IonPage>
  );
};

export default StarfaqDownloadsAndStreaming;