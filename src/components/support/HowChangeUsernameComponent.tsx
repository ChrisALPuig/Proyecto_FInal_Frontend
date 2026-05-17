import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const HowChangeUsernameComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> How do I change my username? </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>How can I change my username?</strong></p>
    <p>To update your profile name, visit the <strong>ACCOUNT & LOCALE</strong> section through CG GALAXY or your browser. You will find a "CHANGE" button located right next to your avatar.</p>

    <p><strong>Username Requirements</strong></p>
    <p>Your new username must be no longer than 18 characters. You are allowed to use letters, numbers, and the following special characters: dots (.), dashes (-), and underscores (_).</p>

    <p><strong>Important Rule</strong></p>
    <p>Keep in mind that username changes are restricted to <strong>once per month</strong>. Make sure you are happy with your new name before confirming the switch!</p>
  </div>
</div>

        <h1 className="more-questions">Do you have more questions?</h1>
        <div className="more-questions-box">
        <div className="more-questions-box-image">
        <img src="/public/communication.png" alt="" />
        </div>
        <div className="more-questions-box-title">
        <h5>Didn't find the answer you were looking for?</h5>
        </div>
        <div className="more-questions-box-p">
        <p>If you were unable to find the answers you were  looking for, please reach out and 
          someone from our  friendly and knowledgeable support team will be  happy to help with 
          their top-notch assistance! We know you want to get back to gaming, so we strive  to answer all messages within 24 hours.
        </p>
        </div>
        <div className="button-contact-uno">
          <IonRouterLink routerLink="/form">
          <button className="button-contact">CONTACT US</button>
          </IonRouterLink>
        </div>
        </div>
        <br></br>
      </div>

    </>
  );
};

export default HowChangeUsernameComponent;