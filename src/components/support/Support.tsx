import { IonPage, IonRouterLink } from "@ionic/react";
import SupportHeader from "./SupportHeader.tsx";
import "./Support.css";

const Support: React.FC = () => {
  return (
    <>
      <SupportHeader />

      <div className="support-content">
        <div className="support-grid">
          {/* IZQUIERDA */}
          <div className="support-item">
            <img
              src="/1.png"
              alt="ORDERS_PAYMENTS"
              className="support-img"
              onClick={() => window.location.href = "/orders-payments"}
            />
            <h5>ORDERS & PAYMENTS</h5>
            <p>Are you having trouble making purchase?</p>
          </div>

          {/* CENTRO */}
          <div className="support-item">
            <img src="/2.png" alt="ACCOUNT_STORE" className="support-img"
            onClick={() => window.location.href = "/account-store"}
            />
            <h5>ACCOUNT & STORE</h5>
            <p>Are you having issues with accessing your account or the store itself?</p>
          </div>

          {/* DERECHA */}
          <div className="support-item">
            <img src="/3.png" alt="POLICIES_GENERAL_INFO" className="support-img"
            onClick={() => window.location.href = "/policies_general"}
            />
            <h5>POLICIES & GENERAL INFO</h5>
            <p>Here you can read our policies, or learn more about our service</p>
          </div>
        </div>

        <h1 className="popular-topics">Popular Support Topics</h1>

        <div className="support-topics">
          <ul>
            <li><IonRouterLink className="support-link" routerLink="/howtopay">How do I buy a game?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/howtobuygif">How do I buy a gift?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/howtochangecurrency">How can I change my currency?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/howtoredeemcode">How do I redeem a code?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/i-tried-to-make-a-payment">I tried to make a payment and it didn't work. What can I do now?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/i-got-charged-and-did-not-get-my-game">I got charged and did not get my game</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/i-cannot-log-in-what-can-i-do">I cannot log in. What can I do?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/how-do-i-reset-my-password">How do I reset my password?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/faq-downloads-and-streaming">How do I download my purchased items?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/faq-downloads-and-streaming">How do I install my DLC?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/faq-downloads-and-streaming">I'm unable to download my game - what can I do?</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/policies_general">How to remove my integration data</IonRouterLink></li>
          </ul>
        </div>
      </div>
      </>
  );
};

export default Support;