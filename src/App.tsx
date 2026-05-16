import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/home/Home.tsx';
import Carrito from './pages/carrito/carrito.tsx';
import carritojuego from './pages/carrito/carrito-juego.tsx';
import payment from './pages/payment/payment.tsx';
import Doom from './pages/juegos/doom.tsx';
import GameDynamicPage from './pages/juegos/GameDynamicPage.tsx';
import SupportPage from './pages/support/SupportPage.tsx';
import OrderPayments from './pages/support/OrderPayments.tsx';
import SignIn from './pages/auth/SignIn.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import Confirmation from './pages/support/Confirmacion.tsx';
import Success from './pages/payment/success.tsx';
import HowToPay from './pages/support/HowToPay.tsx';
import HowToBuyGif from './pages/support/HowToBuyGif.tsx';
import HowToChangeCurrency from './pages/HowToChangeCurrency.tsx';
import IchargedMyGame from './pages/support/IchargedMyGame.tsx';
import NotOrderTheGame from './pages/support/NotOrderTheGame.tsx';
import AdditionalFee from './pages/support/AdditionalFee.tsx';
import IcannotLogin from './pages/support/IcannotLogin.tsx';
import HowDeleteAccount from './pages/support/HowDeleteAccount.tsx';
import IamNotReceivingEmail from './pages/support/IamNotReceivingEmail.tsx';
import HowCanIRecoverAccess from './pages/support/HowCanIRecoverAccess.tsx';
import HowResetPassword from './pages/support/HowResetPassword.tsx';
import HowChangeEmail from './pages/support/HowChangeEmail.tsx';
import WhatIsTwoStepLogin from './pages/support/WhatIsTwoStepLogin.tsx';
import HowChangeUsername from './pages/support/HowChangeUsername.tsx';
import CgVoluntaryRefundPolicy from './pages/support/StarcgVoluntaryRefundPolicy.tsx';
import FaqShoppingExperience from './pages/support/StarfaqShoppingExperience.tsx';
import FaqWebsiteAndAccounts from './pages/support/StarfaqWebsiteAndAccounts.tsx';
import CgUserAgreement from './pages/support/StarcgUserAgreement.tsx';
import FaqGiftCodes from './pages/support/StarfaqGiftCodes.tsx';
import FaqDownloadsAndStreaming from './pages/support/StarfaqDownloadsAndStreaming.tsx';
import PrivacyPolicy from './pages/support/StarprivacyPolicy.tsx';
import EmailFromCgLooksSuspiciousPhishing from './pages/support/StaremailFromCgLooksSuspiciousPhishing.tsx';
import '@ionic/react/css/core.css';
import OrdersSettingsPage from './pages/support/OrdersSettingsPage.tsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Form from './pages/support/FormSupport.tsx';
import Store from './pages/store/store.tsx';
import AccountStoreComponent from './components/support/AccountStoreComponent.tsx';
import Policies_GeneralnfoComponent from './components/support/Policies_GeneralnfoComponent.tsx';
import AccountStore from './pages/support/AccountStore.tsx';
import Policies_Generalnfo from './pages/support/Policies _Generalnfo.tsx';
import HowToRedeemCode from './pages/HowToRedeemCode.tsx';
import TriedToMakePayment from './pages/support/TriedToMakePayment.tsx';
import { ModalProvider } from './contexts/ModalContext.tsx';
import { AlertProvider } from './contexts/AlertContext.tsx';
import { AlertModalConnector } from './contexts/AlertModalConnector.tsx';
import { WishlistProvider } from './contexts/WishlistContext.tsx';
import { CartProvider } from './contexts/useCart.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';
import OrdersPayments from './components/support/OrdersPaymentsComponent.tsx';
import UserOrders from './pages/orders/UserOrders.tsx';
import UserProfile from './pages/UserProfile.tsx';
import MyTickets from './pages/support/MyTickets.tsx';
import Payment from './pages/payment/payment.tsx';




setupIonicReact();

const stripePromise = loadStripe('pk_test_51SQ4n0EJyxBaZfwsZ5SnvsnQVwTfSXhrIzqLbwLlKRkVdTtaqdgn8RFQBH3FTVQzO8dO1dTZD9ggTsGoKJk3FdDv00fL1mnJ6w');

const App: React.FC = () => (
  <IonApp>
    <LanguageProvider>
      <AuthProvider>
        <ModalProvider>
          <AlertProvider>
            <AlertModalConnector />
            <WishlistProvider>
              <CartProvider>
                <NotificationProvider>
                  <IonReactRouter>
                    <IonRouterOutlet>
                      <Route exact path="/home" component={Home} />
                      <Route exact path="/doom" component={Doom} />
                      <Route exact path="/game/:gameId" component={GameDynamicPage} />
                      <Route exact path="/carrito" component={Carrito} />
                      <Route exact path="/carrito-juego" component={carritojuego} />
                      <Route
                        exact
                        path="/payment"
                        render={() => (
                          <Elements stripe={stripePromise}>
                            <Payment />
                          </Elements>
                        )}
                      />
                      <Route exact path="/support" component={SupportPage} />
                      <Route exact path="/orders-payments" component={OrderPayments} />
                      <Route exact path="/login" component={SignIn} />
                      <Route exact path="/register" component={SignUp} />
                      <Route exact path="/confirmacion" component={Confirmation} />
                      <Route exact path="/success" component={Success} />
                      <Route exact path="/howtopay" component={HowToPay} />
                      <Route exact path="/howtobuygif" component={HowToBuyGif} />
                      <Route exact path="/howtochangecurrency" component={HowToChangeCurrency} />
                      <Route exact path="/howtoredeemcode" component={HowToRedeemCode} />
                      <Route exact path="/i-tried-to-make-a-payment" component={TriedToMakePayment} />
                      <Route exact path="/i-got-charged-and-did-not-get-my-game" component={IchargedMyGame} />
                      <Route exact path="/i-got-charged-but-did-not-order-the-game" component={NotOrderTheGame} />
                      <Route exact path="/paid-in-local-currency-but-got-charged-an-additional-fee" component={AdditionalFee} />
                      <Route exact path="/i-cannot-log-in-what-can-i-do" component={IcannotLogin} />
                      <Route exact path="/how-do-i-delete-my-account" component={HowDeleteAccount} />
                      <Route exact path="/i-am-not-receiving-the-two-step-authentication-email" component={IamNotReceivingEmail} />
                      <Route exact path="/how-can-i-recover-access-to-my-lost-cg-account" component={HowCanIRecoverAccess} />
                      <Route exact path="/how-do-i-reset-my-password" component={HowResetPassword} />
                      <Route exact path="/how-do-i-change-my-email-address" component={HowChangeEmail} />
                      <Route exact path="/what-is-two-step-login-and-how-does-it-work" component={WhatIsTwoStepLogin} />
                      <Route exact path="/how-do-i-change-my-username" component={HowChangeUsername} />
                      <Route exact path="/cg-voluntary-refund-policy" component={CgVoluntaryRefundPolicy} />
                      <Route exact path="/faq-shopping-experience" component={FaqShoppingExperience} />
                      <Route exact path="/faq-website-and-accounts" component={FaqWebsiteAndAccounts} />
                      <Route exact path="/cg-user-agreement" component={CgUserAgreement} />
                      <Route exact path="/faq-gift-codes" component={FaqGiftCodes} />
                      <Route exact path="/faq-downloads-and-streaming" component={FaqDownloadsAndStreaming} />
                      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                      <Route exact path="/email-from-cg-looks-suspicious-phishing" component={EmailFromCgLooksSuspiciousPhishing} />
                      <Route exact path="/form" component={Form} /> 
                      <Route exact path="/my-tickets" component={MyTickets} />
                      <Route exact path="/orders-settings" component={OrdersSettingsPage} />
                      <Route exact path="/user-orders" component={UserOrders} />
                      <Route exact path="/user-profile" component={UserProfile} />
                      <Redirect exact from="/" to="/home" />
                      <Route exact path="/games" component={Store} />
                      <Route exact path="/account-store" component={AccountStore} />
                      <Route exact path="/policies_general" component={Policies_Generalnfo} />
                    </IonRouterOutlet>
                  </IonReactRouter>
                </NotificationProvider>
              </CartProvider>
            </WishlistProvider>
          </AlertProvider>
        </ModalProvider>
      </AuthProvider>
    </LanguageProvider>
  </IonApp>
);

export default App;