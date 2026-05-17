import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const HowToRedeemCodePageComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> How do I redeem a code? </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p>
      If you have a retail code or one purchased from an authorized platform, you can claim it by visiting the <strong>redeem page</strong>.
    </p>

    <p>
      Once there, enter your code, complete the “I’m not a robot” verification, and click “Continue.” If the code is valid, the game details will appear. After clicking “Continue” again, the game will be permanently added to your library. 
    </p>
    
    <p>
      <strong>Note:</strong> When you process a code, it is temporarily reserved for your account for a few minutes. If you wish to let someone else use it instead, make sure to click “Cancel” during this window.
    </p>

    <p>
      If the code fails, please double-check that every character was entered correctly. Be aware that codes purchased from <strong>unauthorized key resellers</strong> may have been blocked or previously redeemed by another user.
    </p>
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

export default HowToRedeemCodePageComponent;
