import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const FaqGiftCodesComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> FAQ: Gift codes </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <h2>Gifting on CG</h2>
    <p>
      Gifting allows you to purchase one or multiple games for your friends. It’s a great way to share your favorite titles!
    </p>

    <h3>How to buy and send a gift</h3>
    <p>
      1. Add the game(s) to your cart as usual.<br />
      2. In the checkout screen, check the <strong>"GIFT THIS ORDER"</strong> box below the payment methods.<br />
      3. Enter the recipient's email address and complete the purchase.
    </p>
    <p>
      <strong>Pro Tip:</strong> Gifts are delivered immediately. If you want to send it later (like on a birthday), enter <em>your own email</em> as the recipient. You'll receive the code and can forward it whenever you like.
    </p>

    <h3>Redeeming a Gift</h3>
    <p>
      To redeem a code, open <strong>CG GALAXY</strong>, click the cogwheel icon → "Add games & friends" → <strong>"Redeem a CG code"</strong>. You can also redeem it directly on our website.
    </p>

    <h3>Managing your Gifts</h3>
    <p>
      • <strong>Check Status:</strong> In your Order History, use the filters "Redeemed" or "Unredeemed" to see if your friend has claimed the game.<br />
      • <strong>Fix Errors:</strong> If you made a mistake in the email address, go to your Order History, find the gift, and select <strong>"RESEND GIFT CODE"</strong> to send it to a new address.
    </p>

    <h3>Frequently Asked Questions</h3>
    <p>
      • <strong>Global Access:</strong> All gifts purchased on CG can be redeemed globally, regardless of your friend's region.<br />
      • <strong>Expiration:</strong> Gift codes purchased on CG.COM <strong>never expire</strong>.<br />
      • <strong>Pricing:</strong> Gifts use a region-free price to prevent abuse of regional pricing, so the cost might vary slightly from your local price.<br />
      • <strong>Wallet Funds:</strong> You cannot gift Wallet funds directly, but you can use your own Wallet funds to buy a game as a gift.
    </p>

    <p>
      <em>Note: If you need separate codes for multiple games, please purchase them in separate orders, as one order generates one unique gift code.</em>
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

export default FaqGiftCodesComponent;
