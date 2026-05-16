import { IonPage, IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const HowChangeEmailComponent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">{t("howDoIChangeMyEmail")}</h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>How can I update my email address?</strong></p>
    <p>To change your email, go to the <strong>LOGIN & SECURITY</strong> section, either through the CG GALAXY app or your web browser settings. Simply click the "CHANGE" button to start the process.</p>

    <p><strong>Verification Process</strong></p>
    <p>For your security, you might be asked to re-enter your current password. If you have two-factor authentication (2FA) enabled via an app, you will also need to provide the verification code to proceed.</p>

    <p><strong>Important Limitations</strong></p>
    <p>Please note that email updates are limited to <strong>once per month</strong>. If you encounter any issues or need additional help with this update, feel free to send a message to our support team.</p>
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

export default HowChangeEmailComponent;