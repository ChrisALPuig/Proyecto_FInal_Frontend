import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const CgVoluntaryRefundPolicyComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> CG Voluntary Refund Policy </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
            <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>Our Voluntary Refund Policy</strong></p>
    <p>
      Our updated policy allows you to request a refund for a product up to <strong>30 days after purchase</strong>, even if it has been downloaded, launched, and played. To apply, simply go to your "Order History" page, find the order, and click "Ask for a refund."
    </p>

    <p>
      <strong>Important:</strong> If you're seeking a refund because the game isn't working, please consider contacting our Technical Support first. We’ll do our best to help you get it running!
    </p>

    <p><strong>Refund Options & Processing Times</strong></p>
    <p>
      You can choose between <strong>CG Wallet funds</strong> (processed almost instantly once approved) or a <strong>cash refund</strong> to your original payment method. Cash refunds may take a few business days depending on your bank. Note that methods like paysafecard or SOFORT may take up to a few weeks due to technical processing.
    </p>

    <p><strong>Specific Cases: Pre-orders, DLCs, and Packs</strong></p>
    <p>
      • <strong>Pre-orders:</strong> Refundable throughout the pre-order period and for 30 days after release.<br />
      • <strong>Game Packs:</strong> We cannot divide packs (like Season Passes). Refunding a pack removes the entire collection from your account.<br />
      • <strong>DLCs:</strong> If purchased separately, they can be refunded individually. If you refund a base game, the linked DLCs will also be refunded.
    </p>

    <p><strong>Gifts and Early Access</strong></p>
    <p>
      For <strong>Gifts</strong>, only the original purchaser can request a refund. <strong>Early Access</strong> titles follow the same 30-day rule as any other game.
    </p>

    <p><strong>Fair Use & Limits</strong></p>
    <p>
      We trust you to use this policy fairly. Please remember that <strong>refunds are not reviews</strong>. If you finished a game but didn't like it, we encourage you to share your opinion in a review instead. We reserve the right to refuse refunds in individual cases of policy abuse. Don't be "that person"—no one likes that person!
    </p>

    <p>
      <em>For regional laws or additional rights, please refer to sections 7.1 and 7.2 of our User Agreement.</em>
    </p>
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

export default CgVoluntaryRefundPolicyComponent;
