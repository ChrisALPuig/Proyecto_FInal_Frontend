import { IonPage, IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const IamNotReceivingEmailComponent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">{t("iAmNotReceivingEmail")}</h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>Where can I find my verification code?</strong></p>
    <p>All security codes are sent from <strong>no-reply@cg.com</strong> with the subject "Two-step authentication". If you don't see it in your inbox, please double-check your spam or junk folder.</p>

    <p><strong>Why is my code marked as invalid?</strong></p>
    <p>A unique code is generated every time you enter your login credentials. If you attempt to log in multiple times in a short window, only the most recent code will work. Using an older code will result in an error.</p>

    <p><strong>Important: Do not close the login tab</strong></p>
    <p>Ensure you keep the login window open while you check your email. Closing the page and starting over will automatically void the previous code and generate a new one. We recommend minimizing your browser or using a new tab to retrieve the code instead.</p>

    <p><strong>Dealing with delivery delays</strong></p>
    <p>Sometimes email providers delay messages while scanning them for security. To prevent this, add <strong>@cg.com</strong> and <strong>no-reply@email.cg.com</strong> to your safe senders list. If the code still hasn't arrived, wait about 30 minutes before trying again.</p>

    <p><strong>What is the login limit?</strong></p>
    <p>For security purposes, there is a limit of 5 login attempts per hour. If you exceed this, you will need to wait a full hour before a new verification code can be sent to you.</p>

    <p>If you continue to experience issues after following these steps, please contact our support team so we can look into your case.</p>
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

export default IamNotReceivingEmailComponent;