import { useParams } from "react-router-dom";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import Header from "../../components/Header/Header.tsx";
import GamePage from "../../components/juegos/GameContainer.tsx";

const GameDynamicPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  console.log("🎮 GameDynamicPage - gameId from params:", gameId);

  return (
    <IonPage>
      {/* Header fijo y transparente */}
      <IonHeader className="header-fixed">
        <Header />
      </IonHeader>

      {/* Contenido scrollable */}
      <IonContent fullscreen>
        {gameId ? (
          <>
            {console.log("✅ GameDynamicPage - rendering GamePage with ID:", Number(gameId))}
            <GamePage gameId={Number(gameId)} />
          </>
        ) : (
          <p style={{ padding: '20px', color: '#fff' }}>Juego no encontrado - no gameId in params</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GameDynamicPage;