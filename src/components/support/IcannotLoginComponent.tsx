import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const IcannotLoginComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> I cannot log in. What can I do? </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  {/* Cambiamos el <p> exterior por un <div> para que sea válido */}
  <div className="how-to-buy-text">
    <p>To begin, double-check that your username and password are accurate.</p>

    <p>If you encounter a "User not found" notification, verify any alternative email accounts or aliases you might have used. Searching your inboxes for your original CG registration confirmation can help you identify the correct email address. If you are still unable to identify the right account, please reach out to our Support staff.</p>

    <p>If your credentials are correct but you still can't access your account, try the following fixes:</p>

    <ul>
      <li>Clear your browser’s cookies and cache, then refresh the CG.COM site.</li>
      <li>Switch to a different web browser (preferably a clean installation without extensions).</li>
      <li>Ensure CG.COM is permitted through your antivirus or firewall settings.</li>
    </ul>

    <p>If the problem persists, don't hesitate to contact us.</p>

    <p>If the issue involves Two-Step Authentication codes not being delivered:</p>
    <p>Look through your inbox and spam folder for a message titled "Two-step authentication" from no-reply@CG.COM or no-reply@email.cg.com. Add these senders to your safe list and request a fresh code.</p>

    <p><strong>Important:</strong> Keep the login page open while waiting for the email; the code is only valid for that specific session. If you still haven't received anything after 30 minutes, please contact us directly so we can assist you.</p>
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

export default IcannotLoginComponent;