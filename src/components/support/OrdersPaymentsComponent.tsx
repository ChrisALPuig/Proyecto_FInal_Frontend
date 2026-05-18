import { IonPage, IonRouterLink } from "@ionic/react";
import "./OrdersPaymentsComponent.css"; // <-- nuevo CSS
import SupportHeader from "./SupportHeader.tsx";

const OrdersPayments: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">Order & Payments</h1>
        <p className="orders-description">Are you having trouble making a purchase?</p>
        <div className="divider"></div>

        {/* TABLAS */}
        <div className="tables-container">
          {/* IZQUIERDA */}
          <table className="orders-table">
            <tbody>
              
              <tr><td><IonRouterLink routerLink="/howtopay" className="table-link"><img src="/start.png" alt="star" className="orders-table-images"/>How do I buy a game?</IonRouterLink></td></tr>
              
              <tr><td><IonRouterLink routerLink="/howtobuygif" className="table-link"><img src="/start.png" alt="star" className="orders-table-images"/>How do I buy a gif?</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/howtochangecurrency" className="table-link"><img src="/start.png" alt="star" className="orders-table-images"/>How can I change my currency?</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/howtoredeemcode" className="table-link"><img src="/start.png" alt="star" className="orders-table-images"/>How do I redeem a code?</IonRouterLink></td></tr>
            </tbody>
          </table>

          {/* DERECHA */}
          <table className="orders-table">
            <tbody>
              <tr><td><IonRouterLink routerLink="/i-tried-to-make-a-payment" className="table-link"><img src="/start.png" alt="star" className="orders-table-images"/>I tried to make a payment and 
              it didn’t work</IonRouterLink></td></tr>
              <tr><td> <IonRouterLink routerLink="/i-got-charged-and-did-not-get-my-game" className="table-link"><img src="/start.png" alt="star" className="orders-table-images"/>I got charged and did not get 
              my game</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/i-got-charged-but-did-not-order-the-game" className="table-link"><img src="/start.png" alt="star" className="orders-table-images"/>I got charged but did not order 
              the game</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/paid-in-local-currency-but-got-charged-an-additional-fee" className="table-link"><img src="/start.png" alt="star" className="orders-table-images"/>Paid in local currency, but got
              charged an additional fee</IonRouterLink></td></tr>
            </tbody>
          </table>
        </div>

        <h1 className="more-questions">Do you have more questions?</h1>
        <div className="more-questions-box">
        <div className="more-questions-box-image">
        <img src="/communication.png" alt="" />
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

export default OrdersPayments;
