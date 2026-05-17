import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const FaqDownloadsAndStreamingComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> FAQ: Downloads and streaming </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
  <div className="how-to-buy-text">
    <h2>Downloads and Installation</h2>
    <p>
      Once your purchase is complete, you can access your games and movies immediately through the <strong>"My Account"</strong> section or the <strong>CG GALAXY</strong> app.
    </p>

    <h3>Limits and Re-downloads</h3>
    <p>
      There is <strong>no limit</strong> to how many times you can re-download your purchased items. You are also free to install your games on multiple computers in your household (laptop, desktop, etc.). However, remember that your account is personal; sharing your login information or games with people outside your household is not permitted.
    </p>

    <h3>Do I need a launcher to play?</h3>
    <p>
      <strong>No.</strong> One of the best things about CG is that all our games are <strong>DRM-free</strong>. You can download standalone, self-executable (.exe) installers that don't require any internet connection or launcher to work. 
    </p>
    <p>
      If you prefer convenience, you can use <strong>CG GALAXY</strong> for automatic updates, achievements, and cloud saves, but it is 100% optional.
    </p>

    <h3>Bonus Content & Movies</h3>
    <p>
      • <strong>Bonuses:</strong> Wallpapers, soundtracks, and manuals can be found in your library. Just click on the game's box art in "My Account" to see all available downloads.<br />
      • <strong>Movies:</strong> You can stream them directly from your browser for instant viewing or download them as .mp4 files for the highest quality.
    </p>

    <h3>Troubleshooting</h3>
    <p>
      • <strong>Game not in library?</strong> If you have the confirmation email but don't see the game, try refreshing your account library.<br />
      • <strong>Payment issues?</strong> If you weren't redirected to the success screen and have no email, check if you were actually charged before contacting support.<br />
      • <strong>Technical bugs?</strong> For crashes or installation errors, visit our Support section or the community forums, where each game has its own dedicated space for fans to help each other.
    </p>

    <p>
      <em>Tip: For movies, we recommend using a reliable player like VLC or Media Player Classic to ensure smooth playback.</em>
    </p>
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

export default FaqDownloadsAndStreamingComponent;