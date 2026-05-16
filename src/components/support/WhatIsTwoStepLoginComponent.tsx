import { IonPage, IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const WhatIsTwoStepLoginComponent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> What is two-step login and how does it work? </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <p><strong>What is Two-Step Login and why should I use it?</strong></p>
    <p>Two-step login adds an essential layer of protection to your CG account. When active, it verifies your identity whenever you access your account from a new device, browser, or location. While you can disable this in your settings, we strongly recommend keeping it active to stay secure.</p>

    <p><strong>Method 1: Authenticator App (Recommended)</strong></p>
    <p>For better security and faster access, you can use apps like Google Authenticator, Authy, or Microsoft Authenticator. These generate temporary codes directly on your phone.</p>
    
    <p><strong>How to set up:</strong></p>
    <p>1. Install an authenticator app on your smartphone.<br />
       2. Go to the "Login and Security" tab in your CG settings and select the Authenticator App option.<br />
       3. Scan the QR code shown on screen with your app.<br />
       4. Enter the 6-digit code to verify the connection.<br />
       5. <strong>Important:</strong> Save the provided backup codes in a safe place. You will need them if you ever lose your phone.</p>

    <p><strong>Method 2: Email Verification</strong></p>
    <p>By default, we send a 4-digit code to your registered email address when you log in. This code remains valid for 15 minutes. Remember to keep your login window open while checking your inbox; starting over will generate a new code and cancel the previous one.</p>

    <p><strong>Troubleshooting</strong></p>
    <p>Please note that you can only use one verification method at a time. If you experience issues with your codes or apps, don't hesitate to contact our support team to help you regain access safely.</p>
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

export default WhatIsTwoStepLoginComponent;