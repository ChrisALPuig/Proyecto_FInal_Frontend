import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const FaqWebsiteAndAccountsComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> FAQ: Website and accounts </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>Do I need a user account?</strong></p>
    <p>
      Yes, while you can browse the catalog and forums without one, a <strong>user account is required</strong> to purchase and download games. Having an account allows you to manage your library and access all site functionalities.
    </p>

    <p><strong>How to create and manage your account</strong></p>
    <p>
      Simply click the <strong>"Sign up"</strong> button in the top menu, fill in your details, and confirm. Once logged in, you will see an "Account" button instead of the login options. To log out, hover over the "Account" button and select "Logout" from the dropdown menu.
    </p>

    <p><strong>Browser Recommendations</strong></p>
    <p>
      For the best experience, we recommend using the latest versions of <strong>Google Chrome</strong> or <strong>Mozilla Firefox</strong>. Our site is also compatible with Safari and Opera, provided they are kept up to date.
    </p>

    <p><strong>Troubleshooting Website Issues</strong></p>
    <p>If you experience any technical problems while browsing, please try the following steps:</p>
    <p>
      • Ensure your browser is updated to the latest stable version.<br />
      • Disable any <strong>extensions or plugins</strong> (like ad-blockers) that might interfere with the site.<br />
      • Try accessing the site from a different browser or an incognito window.
    </p>

    <p>
      If the issue persists, contact our support team with details about your operating system and browser version. <strong>Screenshots</strong> of the error are always very helpful!
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

export default FaqWebsiteAndAccountsComponent;