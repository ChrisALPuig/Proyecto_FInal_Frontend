import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import Header from '../../components/Header/Header.tsx';
import GamePage from '../../components/juegos/GameContainer.tsx';

const ResidentEvil8: React.FC = () => {
  return (
    <IonPage>
      {/* Header fijo y transparente */}
      <IonHeader className="header-fixed">
        <Header />
      </IonHeader>
      {/* Contenido scrollable */}
      <IonContent fullscreen>
        <GamePage gameId={2} />
      </IonContent>
    </IonPage>
  );
};

export default ResidentEvil8;