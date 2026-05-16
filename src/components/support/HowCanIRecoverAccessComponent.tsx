import { IonPage, IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const HowCanIRecoverAccessComponent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">{t("howCanIRecoverAccess")}</h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>What if I can’t access my registered email?</strong></p>
    <p>If you have lost access to the email account linked to your CG profile, please contact our support team. We can help you update your login details manually to restore your access.</p>

    <p><strong>Identity Verification</strong></p>
    <p>To protect your account, be prepared to answer some security questions. This helps us confirm that you are the rightful owner before we make any changes to your credentials.</p>

    <p><strong>Security Warning:</strong></p>
    <p>Please remember that CG Staff will <strong>never</strong> ask for your password. To keep your account safe, never share your login credentials with anyone.</p>
  </div>
</div>

        <h1 className="more-questions">{t("moreQuestions")}</h1>
        <div className="more-questions-box">
        <div className="more-questions-box-image">
        <img src="/public/communication.png" alt="" />
        </div>
        <div className="more-questions-box-title">
        <h5>{t("didntFindAnswer")}</h5>
        </div>
        <div className="more-questions-box-p">
        <p>{t("didntFindAnswerDescription")}</p>
        </div>
        <div className="button-contact-uno">
          <IonRouterLink routerLink="/form">
          <button className="button-contact">{t("contactUs")}</button>
          </IonRouterLink>
        </div>
        </div>
        <br></br>
      </div>

    </>
  );
};

export default HowCanIRecoverAccessComponent;