import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const EmailFromCgLooksSuspiciousPhishingComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> Email from CG looks suspicious / Phishing </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <h2>Online Safety & Phishing Protection</h2>
    <p>
      At CG, we strive to maintain a safe and trustworthy environment. Protecting our users from online harm is a top priority, and we want you to have fun without worrying about security threats.
    </p>

    <h3>Is this email really from CG?</h3>
    <p>
      If you receive a suspicious marketing email, always verify the sender's address. Our official newsletter offers are exclusively sent from:
    </p>
    <p>
      • <strong>newsletter@email3.cg.com</strong>
    </p>
    <p>
      If you're ever unsure about an offer, feel free to confirm its validity with our <strong>Support Team</strong> or our Community before clicking any links.
    </p>

    <h3>Official CG Email Addresses</h3>
    <p>
      Sometimes, legitimate emails are flagged as spam by your provider. To ensure your account's safety, please verify that communications come from these official addresses:
    </p>
    <ul>
      <li><strong>no-reply@email.cg.com</strong> – Used for password resets and email change notifications.</li>
      <li><strong>do-not-reply@email.cg.com</strong> – Used for order confirmations and gift codes.</li>
    </ul>
    <p>
      <em>Always verify the sender before marking a flagged message as safe!</em>
    </p>

    <h3>Reporting Suspicious Activity</h3>
    <p>
      If you find a website posing as CG.COM or any other content that infringes on copyright or security policies, please <strong>report it to us immediately</strong>. 
    </p>
    <p>
      You can use our official reporting form to help us take down malicious sites and protect the rest of the community. For more details on how we protect you, check out our moderation and security articles.
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

export default EmailFromCgLooksSuspiciousPhishingComponent;
