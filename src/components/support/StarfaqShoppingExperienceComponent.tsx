import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const FaqShoppingExperienceComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> FAQ: Shopping experience </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>Security & Payment Protection</strong></p>
    <p>
      Your security is our top priority. We protect the confidentiality of every transaction using <strong>SSL encryption</strong>. For added safety, we do not store any credit card information on our servers, ensuring your payment details are as secure as possible.
    </p>

    <p><strong>How to Place an Order</strong></p>
    <p>
      It’s very simple! Find the game you want using our search bar or by browsing the catalog. Once you've found a title, click its price icon or visit its product page to select <strong>"Add to Cart."</strong>
    </p>
    <p>
      Our checkout is a streamlined, one-step process. After a successful payment, your game will be instantly available in your library through the <strong>CG GALAXY</strong> app or your "My Account" page.
    </p>

    <p><strong>Gifting a Game</strong></p>
    <p>
      To send a gift, add the game to your cart as usual. During checkout, simply check the <strong>"Gift this order"</strong> option. Enter the recipient's email address, complete the payment, and they will receive an email with their new game immediately.
    </p>

    <p><strong>Need Help with an Order?</strong></p>
    <p>
      If you encounter any issues or have questions regarding your purchases, please reach out to our <strong>Support Team</strong>. To help us resolve your case faster, please include as much information as possible, such as error messages or the steps you've already taken.
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

export default FaqShoppingExperienceComponent;