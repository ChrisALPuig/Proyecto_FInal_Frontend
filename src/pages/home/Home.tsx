import { IonContent, IonHeader, IonPage } from '@ionic/react';
import Header from '../../components/Header/Header.tsx';
import HomeBien from '../../components/home/home.tsx';

interface HomeProps {
  initialAuthMode?: "login" | "register" | null;
}

const Home: React.FC<HomeProps> = ({ initialAuthMode }) => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <HomeBien initialAuthMode={initialAuthMode} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
