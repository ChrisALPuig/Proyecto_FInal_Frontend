import { IonPage, IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import SupportHeader from "./SupportHeader.tsx";
import "./Support.css";

const Support: React.FC = () => {
  const { t } = useLanguage();
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
            <h5>{t("ordersAndPayments")}</h5>
            <p>{t("havingTroubleMakingPurchase")}</p>
          </div>

          {/* CENTRO */}
          <div className="support-item">
            <img src="/2.png" alt="ACCOUNT_STORE" className="support-img"
            onClick={() => window.location.href = "/account-store"}
            />
            <h5>{t("accountAndStore")}</h5>
            <p>{t("havingIssuesWithAccount")}</p>
          </div>

          {/* DERECHA */}
          <div className="support-item">
            <img src="/3.png" alt="POLICIES_GENERAL_INFO" className="support-img"
            onClick={() => window.location.href = "/policies_general"}
            />
            <h5>{t("policiesAndGeneralInfo")}</h5>
            <p>{t("readPoliciesLearnMore")}</p>
          </div>
        </div>

        <h1 className="popular-topics">{t("popularSupportTopics")}</h1>

        <div className="support-topics">
          <ul>
            <li><IonRouterLink className="support-link" routerLink="/howtopay">{t("howDoIBuyAGift")}</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/howtobuygif">{t("howDoIBuyAGift")}</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/howtochangecurrency">{t("howCanIChangeMyCurrency")}</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/howtoredeemcode">{t("howDoIRedeemACode")}</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/i-tried-to-make-a-payment">{t("iTriedToMakePayment")}</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/i-got-charged-and-did-not-get-my-game">{t("iGotChargedNoGame")}</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/i-cannot-log-in-what-can-i-do">{t("iCannotLogin")}</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/how-do-i-reset-my-password">{t("howDoIResetMyPassword")}</IonRouterLink></li>
            <li><IonRouterLink className="support-link" routerLink="/faq-downloads-and-streaming">{t("downloadMyPurchasedItems")}</IonRouterLink></li>
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