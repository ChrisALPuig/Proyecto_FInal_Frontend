import { IonContent, IonPage } from '@ionic/react';
import FaqShoppingExperienceComponent from '../../components/support/StarfaqShoppingExperienceComponent.tsx';

const StarfaqShoppingExperience: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <FaqShoppingExperienceComponent />
      </IonContent>
    </IonPage>
  );
};

export default StarfaqShoppingExperience;