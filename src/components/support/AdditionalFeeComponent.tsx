import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const AdditionalFeeComponent: React.FC = () => {
  return (
    <>
      <SupportHeader />
      <div className="orders-content">
        <h1 className="orders-titles"> Paid in local currency, but got charged an additional fee </h1>
        <div className="divider"></div>
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>Information regarding transaction fees</strong></p>
    <p>
      CG only charges the exact amount displayed in your shopping cart at the time of purchase; we do not apply any additional or hidden fees. 
    </p>

    <p>
      If you notice a higher amount on your bank or PayPal statement than what was shown during checkout, we recommend contacting your payment provider for further clarification. These discrepancies are typically due to external factors, such as currency conversion rates or international transaction fees applied by your financial institution.
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

export default AdditionalFeeComponent;

