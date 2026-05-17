import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const HowDeleteAccountComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> How do I delete my account? </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
      <div className="how-to-buy-text">
    {/* Sección 1 */}
    <h3>How can I close my account?</h3>
    <p>You can initiate the removal process directly from your account settings. Clicking the "DELETE ACCOUNT" button triggers a confirmation link sent to your registered email. Once you confirm via email, your profile will be scheduled for permanent deletion after a 14-day grace period. During these two weeks, you can still access your library, but after that, the process is final.</p>

    {/* Sección 2 */}
    <h3>What are the consequences of account removal?</h3>
    <p>After the process finishes, you will lose permanent access to your entire game library, any unused digital content, redeemed gift codes, and remaining CG Wallet balances.</p>

    {/* Sección 3 */}
    <h3>Is it possible to stop the deletion?</h3>
    <p>Yes, you have a 14-day window following your email confirmation to cancel the request through your settings. Once this period expires, the account cannot be recovered.</p>

    {/* Sección 4 */}
    <h3>Can a deleted account be restored?</h3>
    <p>No, once the removal is fully processed, it is permanent and cannot be undone.</p>

    {/* Sección 5 */}
    <h3>Are refunds issued automatically?</h3>
    <p>No, deleting your account does not trigger automatic refunds for any of your past purchases.</p>

    {/* Sección 6 */}
    <h3>Can I sign up again with the same info?</h3>
    <p>Yes. Once your old account is completely gone, you are free to create a new one using the same username and email address.</p>

    {/* Sección 7 */}
    <h3>What data is kept after deletion?</h3>
    <p>For legal and tax reasons, we must retain specific records, such as transaction history and support tickets, to prove we fulfilled your requests. Regarding your public activity, forum posts and reviews will be anonymized. If you wish to have them completely removed, please contact Support before your account is deleted. For further privacy inquiries, you can reach out to our team or email privacy@cg.com.</p>
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

export default HowDeleteAccountComponent;