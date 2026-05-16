import { IonPage, IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const StarprivacyPolicyComponent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> Privacy Policy </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <h2>Privacy Policy</h2>
    <p><em>Last updated: April 2026</em></p>
    <p>
      At CG, we respect your privacy. This policy explains what information we collect when you use CG.COM or the CG GALAXY app, how we use it, and how we keep it safe.
    </p>

    <hr />

    <h3>1. Who We Are</h3>
    <p>
      We are <strong>CG sp. z o.o.</strong>, based in Warsaw, Poland. You can always reach our Data Protection Officer at <strong>privacy@cg.com</strong> for any privacy-related queries.
    </p>

    <h3>2. Information We Collect</h3>
    <p>To provide you with the best gaming experience, we collect:</p>
    <ul>
      <li><strong>Account Data:</strong> Email, username, and encrypted password.</li>
      <li><strong>Technical Data:</strong> IP address, operating system, and browser type.</li>
      <li><strong>Usage Data:</strong> Games you play, achievements, and purchase history.</li>
      <li><strong>Payment Info:</strong> We <u>do not</u> store full credit card details. We only receive hashed/anonymized confirmation from payment processors.</li>
    </ul>

    <h3>3. Protecting Children</h3>
    <p>
      We do not knowingly collect personal information from anyone under <strong>16 years old</strong>. If you are a parent and have concerns, please contact us immediately.
    </p>

    <h3>4. Why We Use Your Data</h3>
    <p>We process your information to:</p>
    <p>
      • Provide access to your games and technical support.<br />
      • Personalize your experience and recommend games you might like.<br />
      • Ensure the security of our services and prevent fraud.<br />
      • Comply with legal, tax, and accounting obligations.
    </p>

    <h3>5. Data Sharing & Trusted Partners</h3>
    <p>
      We don't sell your data. We only share necessary information with <strong>Trusted Partners</strong> who help us run CG, such as:
    </p>
    <p>
      • Payment providers (to process your orders).<br />
      • Game developers/publishers (to provide game features and stats).<br />
      • Customer support tools (to answer your tickets).
    </p>

    <h3>6. Your Rights</h3>
    <p>
      You are in control. You have the right to <strong>access, correct, or delete</strong> your personal data at any time. You can also object to marketing emails by clicking "unsubscribe" or adjusting your account settings.
    </p>

    <hr />
    <p>
      <strong>Summary:</strong> We collect only what we need to make CG work for you. We store it safely and you can ask us to delete it whenever you want. <strong>Your data, your rules.</strong>
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

export default StarprivacyPolicyComponent;