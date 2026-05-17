import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const TriedToMakePaymentComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> I tried to make a payment and it didn't work. What can I do now? </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p>Although we strive to make our payment systems as reliable as possible, certain situations beyond our control can occasionally cause a transaction to fail.</p>

    <p>If you haven’t received a confirmation and no funds have been deducted from your account, we recommend trying the payment again. It is possible that an error occurred while entering your card details.</p>

    <p>If you are certain your information is correct but the payment still fails, your bank may have declined the transaction. Please keep in mind that CG operates from Europe; therefore, your card must be authorized for <strong>international payments</strong> (some prepaid cards, particularly those issued in the U.S., may not support this).</p>

    <p>Since most payment issues are handled externally, you may need to contact your bank for further assistance. If they confirm that everything is correct on their end or if they don't see any attempts from <strong>"CG.COM"</strong> or <strong>"CG Ltd"</strong>, please reach out to us via our support form.</p>

    <p><strong>Important:</strong> If it appears that you were charged but the game has not been added to your library, please contact us immediately so we can investigate.</p>

    <p>Also, keep in mind that banks often place a <strong>temporary hold</strong> on funds during a transaction attempt, which can sometimes be mistaken for an actual charge. We recommend verifying with your bank whether the payment was fully processed or just reserved.</p>
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

export default TriedToMakePaymentComponent;
