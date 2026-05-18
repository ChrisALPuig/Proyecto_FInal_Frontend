import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const CgUserAgreementComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> CG User Agreement </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <h2>CG User Agreement</h2>
    <p>
      <em>Last updated: April 2026</em>
    </p>
    <p>
      Welcome to CG! We’ve designed this Agreement to be as simple as possible, with <strong>short summaries</strong> to help you understand the legal terms. Please remember that the full text is what is legally binding. By using CG services, you agree to these terms.
    </p>

    <hr />

    <h3>1. About This Agreement</h3>
    <p>
      <strong>Legal:</strong> This is a contract between you and CG sp. z o.o. (Warsaw, Poland). It applies to the website, your account, CG GALAXY, and any content you purchase through us.
    </p>
    <blockquote>
      <strong>Summary:</strong> This explains how you can use CG.COM, CG GALAXY, and your games.
    </blockquote>

    <h3>2. Age Requirements</h3>
    <p>
      <strong>Legal:</strong> You must be 18+ to use CG independently. If you are between 16 and 18, you need parental or guardian approval.
    </p>
    <blockquote>
      <strong>Summary:</strong> If you are under 18 (but at least 16), you need your parents' permission. It's a legal requirement!
    </blockquote>

    <h3>3. Using CG Services</h3>
    <p>
      <strong>Legal:</strong> we grant you a personal, non-exclusive license to use CG content for personal, non-commercial use. This license can be suspended in specific situations (like breaching the rules).
    </p>
    <p>
      • <strong>CG GALAXY:</strong> An optional app with extra features like cloud saves and cross-play.<br />
      • <strong>Patrons:</strong> A voluntary program to support our mission to "Make Games Live Forever."
    </p>

    <h3>4. System Requirements</h3>
    <p>
      You are responsible for ensuring your system meets the minimum hardware and software specs listed on each product page. 
      <strong>Note:</strong> CG games are not tested on virtual machines, and we do not officially support them.
    </p>

    <h3>5. Payments and Refunds</h3>
    <p>
      • <strong>Payments:</strong> You can pay via credit/debit cards, PayPal, or CG Wallet.<br />
      • <strong>Currency:</strong> Prices include applicable taxes (VAT/Sales Tax).<br />
      • <strong>Refunds:</strong> We offer a 30-day voluntary refund policy. Additionally, EU residents have a statutory 14-day withdrawal right.
    </p>

    <h3>6. Rules of Conduct</h3>
    <p>To keep CG safe, you agree NOT to:</p>
    <p>
      • Use CG for commercial or political purposes.<br />
      • Hack, harm, or interfere with our servers.<br />
      • Use cheats, bots, or extraction tools.<br />
      • Share, sell, or steal CG accounts.<br />
      • Say or do anything racist, sexist, or offensive. <strong>Please, be nice!</strong>
    </p>

    <h3>7. User Generated Content</h3>
    <p>
      You own the content you create (reviews, profile pictures), but by posting it, you give CG a license to use and display it across our services so others can see your contributions.
    </p>

    <hr />
    <p>
      <em>This is a simplified version of our terms. For the full legal experience, please refer to the complete documentation provided by CG sp. z o.o.</em>
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

export default CgUserAgreementComponent;
