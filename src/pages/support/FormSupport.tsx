import { IonContent, IonPage } from '@ionic/react';
import FormularioComponente from '../../components/support/FormularioComponente.tsx';


const Form: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <FormularioComponente />
      </IonContent>
    </IonPage>
  );
};

export default Form;
