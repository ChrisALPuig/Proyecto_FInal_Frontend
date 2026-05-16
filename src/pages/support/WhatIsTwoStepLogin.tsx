import { IonContent, IonPage } from '@ionic/react';
import WhatIsTwoStepLoginComponent from '../../components/support/WhatIsTwoStepLoginComponent.tsx';

const WhatIsTwoStepLogin: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <WhatIsTwoStepLoginComponent />
      </IonContent>
    </IonPage>
  );
};

export default WhatIsTwoStepLogin;