import { IonButton, IonContent, IonHeader, IonImg, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './carrito-vacio.css';
import Header from '../../components/Header/Header.tsx';


const Carrito: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="carrito-vacio">
        <div className="contenido-centro">
          <IonImg className="imagen-carrito-vacio" src="/assets/images/carrito-vacio.png" />
          <IonText color="medium">
            <h1>YOUR CART IS EMPTY</h1>
            <p>Explore great games and offers</p>
            <IonButton className="boton-carrito" color="none" fill="solid" routerLink="/home">
            <b>BROWSE BESTSELLERS</b>
            </IonButton>
            </IonText>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Carrito;