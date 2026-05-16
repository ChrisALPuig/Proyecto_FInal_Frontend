import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ListaCarrito from '../../components/carrito/ListaCarrito.tsx';
import Header from '../../components/Header/Header.tsx';


const carritojuego: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen >
        <Header />
        <ListaCarrito />
      </IonContent>
    </IonPage>
  );
};

export default carritojuego;