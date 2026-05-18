import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const HowChangeEmailComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> How do I change my email address? </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>How can I update my email address?</strong></p>
    <p>To change your email, go to the <strong>LOGIN & SECURITY</strong> section, either through the CG GALAXY app or your web browser settings. Simply click the "CHANGE" button to start the process.</p>

    <p><strong>Verification Process</strong></p>
    <p>For your security, you might be asked to re-enter your current password. If you have two-factor authentication (2FA) enabled via an app, you will also need to provide the verification code to proceed.</p>

    <p><strong>Important Limitations</strong></p>
    <p>Please note that email updates are limited to <strong>once per month</strong>. If you encounter any issues or need additional help with this update, feel free to send a message to our support team.</p>
  </div>
</div>

        <h1 className="more-questions">Do you have more questions?</h1>
        <div className="more-questions-box">
        <div className="more-questions-box-image">
        <img src="/communication.png" alt="" />
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

export default HowChangeEmailComponent;
