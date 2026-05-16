import { IonPage, IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./HowToPayComponente.css"; // <-- nuevo CSS
import SupportHeader from "./SupportHeader.tsx";

const HowToPay: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">{t("howDoIBuyAGift")}</h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p>{t("superEasy")}</p>
    
    <p>
      {t("catalogPageClick")}<br />
      {t("productPageClick")}
    </p>

    <p>{t("checkoutInstructions")}</p>

    <p>{t("paymentMethodInstructions")}</p>
  </div>
            <div className="how-to-buy-gif-container">
            <img src="/game_buy.gif" alt="How to buy tutorial" className="how-to-buy-gif"/>
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

export default HowToPay;
