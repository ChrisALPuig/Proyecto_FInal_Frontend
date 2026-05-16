import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import DoomContainer from '../../components/juegos/doom/doomContainer.tsx';
import Header from '../../components/Header/Header.tsx';

const Doom: React.FC = () => {
  return (
    <IonPage>
      {/* Header fijo y transparente */}
      <IonHeader className="header-fixed">
        <Header />
      </IonHeader>
      {/* Contenido scrollable */}
      <IonContent fullscreen>
        <DoomContainer />
      </IonContent>
    </IonPage>
  );
};

export default Doom;