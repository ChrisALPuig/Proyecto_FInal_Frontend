import React from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonButton
} from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import Header from '../../components/Header/Header.tsx';
import './Confirmacion.css'; // asegúrate de importar el CSS

const Confirmation: React.FC = () => {
  return (
    <IonPage>
        <Header />
      <IonContent fullscreen>
        <div className="centered-container">
          <IonCard className="confirmation-card">
            <IonCardContent>
              <IonIcon
                icon={checkmarkCircleOutline}
                color="success"
                style={{ fontSize: '80px' }}
              />

              <IonText color="success">
                <h1>Request Sent Successfully!</h1>
              </IonText>

              <IonText color="medium">
                <p>Your request has been submitted successfully.</p>
                <p>
                  Our team will review it and you will receive a response
                  within <strong>24 to 48 hours</strong>.
                </p>
              </IonText>

              <IonButton
                expand="block"
                color="primary"
                routerLink="/home"
                className="ion-margin-top"
              >
                Back to Home
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Confirmation;