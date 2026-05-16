import { IonPage, IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const NotOrderTheGameComponent: React.FC = () => {
  const { t } = useLanguage();
  return (
    <>
      <SupportHeader />
      <div className="orders-content">
        <h1 className="orders-titles"> I got charged but did not order the game </h1>
        <div className="divider"></div>
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p>
      If you believe you have been charged for a game you did not intend to purchase, please contact us directly. Our team will look into the transaction and help clarify the situation for you.
    </p>

    <p><strong>Note regarding Fahrenheit: Indigo Prophecy Remastered</strong></p>
    <p>
      If you received an order confirmation for <em>Fahrenheit: Indigo Prophecy Remastered</em> without having bought it, you can safely ignore the email. This game was automatically added for free to the libraries of everyone who owned the original version of <em>Fahrenheit</em>. 
    </p>

    <p>
      Due to a technical error, confirmation emails were sent out during this process. We sincerely apologize for any confusion or concern this may have caused.
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
            <p>If you were unable to find the answers you were looking for, please reach out and someone from our friendly and knowledgeable support team will be happy to help with their top-notch assistance! We know you want to get back to gaming, so we strive to answer all messages within 24 hours.</p>
          </div>
          <div className="button-contact-uno">
            <IonRouterLink routerLink="/form">
              <button className="button-contact">CONTACT US</button>
            </IonRouterLink>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default NotOrderTheGameComponent;
