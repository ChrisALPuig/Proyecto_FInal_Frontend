import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css"; // <-- nuevo CSS
import SupportHeader from "./SupportHeader.tsx";

const HowToPay: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">How do I buy a game?</h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p>It's super-easy! First, you need to add a game to your cart, which you can do from two different places:</p>
    
    <p>
      • The catalog page, by clicking on the game's price.<br />
      • The product page, by clicking the "Add to Cart" button.
    </p>

    <p>Once you have one or more items in your cart, click the Cart icon in the upper-right corner of the screen and select "Checkout Now". You can also do this directly from any product page, where the "Add to Cart" button will be replaced by "Checkout Now" once the item is added.</p>

    <p>In the Checkout section, you will need to select your preferred payment method (such as credit card or PayPal). After entering all the required data, simply click "Pay for your order now" to complete your purchase.</p>
  </div>
            <div className="how-to-buy-gif-container">
            <img src="/game_buy.gif" alt="How to buy tutorial" className="how-to-buy-gif"/>
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

export default HowToPay;

