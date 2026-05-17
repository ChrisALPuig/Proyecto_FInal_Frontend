import { IonPage, IonRouterLink } from "@ionic/react";
import "./OrdersPaymentsComponent.css"; // <-- nuevo CSS
import SupportHeader from "./SupportHeader.tsx";

const AccountStoreComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">Account & Store</h1>
        <p className="orders-description">Are you having issues with accessing your account or the store itself?</p>
        <div className="divider"></div>

        {/* TABLAS */}
        <div className="tables-container">
          {/* IZQUIERDA */}
          <table className="orders-table">
            <tbody>
              
              <tr><td><IonRouterLink routerLink="/I-cannot-log-in-What-can-I-do?" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/> I cannot log in. What can I do? </IonRouterLink></td></tr>
              
              <tr><td><IonRouterLink routerLink="/how-do-i-delete-my-account" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/> How do I delete my account?  </IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/i-am-not-receiving-the-two-step-authentication-email" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>I am not receiving the two-step authentication email </IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/how-can-i-recover-access-to-my-lost-cg-account" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>How can I recover access to my lost CG account? </IonRouterLink></td></tr>
            </tbody>
          </table>

          {/* DERECHA */}
          <table className="orders-table">
            <tbody>
              <tr><td><IonRouterLink routerLink="/how-do-i-reset-my-password" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/> How do I reset my password?  
              </IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/how-do-i-change-my-email-address" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>How do I change my email address? </IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/what-is-two-step-login-and-how-does-it-work" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>What is two-step login and how does it work? </IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/how-do-i-change-my-username" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>How do I change my username? </IonRouterLink></td></tr>
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

export default AccountStoreComponent;