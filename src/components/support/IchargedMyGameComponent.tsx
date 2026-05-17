import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const IchargedMyGameComponent: React.FC = () => {
  return (
    <>
      <SupportHeader />
      <div className="orders-content">
  <h1 className="orders-titles">I got charged and did not get my game</h1>
  <div className="divider"></div>
  <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p>
      Please keep in mind that banks often "block" or reserve funds before a transaction is fully processed. It is easy to mistake these pending authorizations for actual charges, so we recommend double-checking your bank statement to confirm if the payment was truly completed.
    </p>

    <p>
      If your order has not been processed after two hours and you still cannot access your games—despite a successful payment—please contact us directly so we can investigate and resolve the issue for you.
    </p>

    <p>
      <strong>How to find your DLCs and Expansions:</strong><br />
      Note that these items are not listed as separate entries in your library. To download a DLC using <strong>CG GALAXY</strong>, follow these steps:
    </p>

    <p>
      • Select the main game in you CG GALAXY library.<br />
      • Click the customization icon (located next to the PLAY button).<br />
      • Navigate to "Manage installation" and then select "Configure".<br />
      • Mark the checkbox for your DLC and confirm with "OK".
    </p>

    <p>
      If you prefer to install your DLCs manually without using the app, open your browser and access your <a href="https://www.cg.com/account" target="_blank" rel="noopener noreferrer">CG account library</a>. Select the main game, click on "DOWNLOAD OFFLINE BACKUP GAME INSTALLERS", scroll down to the "DLC installers" section, and download the corresponding setup files.
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

export default IchargedMyGameComponent;
