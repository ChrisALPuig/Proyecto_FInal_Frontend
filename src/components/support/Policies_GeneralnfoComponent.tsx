import { IonPage, IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./OrdersPaymentsComponent.css"; // <-- nuevo CSS
import SupportHeader from "./SupportHeader.tsx";

const Policies_GeneralnfoComponent: React.FC = () => {
  const { t } = useLanguage();
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">Policies & General Info</h1>
        <p className="orders-description">Here you can read our policies, or learn more about our service.</p>
        <div className="divider"></div>

        {/* TABLAS */}
        <div className="tables-container">
          {/* IZQUIERDA */}
          <table className="orders-table">
            <tbody>
              
              <tr><td><IonRouterLink routerLink="/cg-voluntary-refund-policy" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>CG Voluntary Refund Policy </IonRouterLink></td></tr>
              
              <tr><td><IonRouterLink routerLink="/faq-shopping-experience" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>FAQ: Shopping experience </IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/faq-website-and-accounts" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>FAQ: Website and accounts</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/cg-user-agreement" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>CG User Agreement</IonRouterLink></td></tr>
            </tbody>
          </table>

          {/* DERECHA */}
          <table className="orders-table">
            <tbody>
              <tr><td><IonRouterLink routerLink="/faq-gift-codes" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>FAQ: Gift codes</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/faq-downloads-and-streaming" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>FAQ: Downloads and streaming</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/privacy-policy" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>Privacy Policy</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/email-from-cg-looks-suspicious-phishing" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>Email from CG looks suspicious / Phishing</IonRouterLink></td></tr>
            </tbody>
          </table>
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

export default Policies_GeneralnfoComponent;