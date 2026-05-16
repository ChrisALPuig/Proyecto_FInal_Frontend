import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/Header/Header.tsx';
import HomeBien from '../../components/home/home.tsx';
import Register from '../../components/auth/register.tsx';


const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Register />
        <Header />
        <HomeBien />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
