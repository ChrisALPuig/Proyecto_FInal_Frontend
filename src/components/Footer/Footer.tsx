import React from 'react';
import { IonRouterLink } from '@ionic/react';
import { Mail, MapPin, Phone, Github, Twitter, Facebook, Instagram } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Sección superior - Información */}
        <div className="footer-sections">
          {/* Sobre nosotros */}
          <div className="footer-section">
            <h3 className="footer-title">ABOUT US</h3>
            <p className="footer-text">
              ChestGames is your ultimate destination for premium video games. 
              Discover, buy, and enjoy the latest titles across all platforms.
            </p>
          </div>

          {/* Enlaces útiles */}
          <div className="footer-section">
            <h3 className="footer-title">QUICK LINKS</h3>
            <ul className="footer-links">
              <li><IonRouterLink routerLink="/home">Home</IonRouterLink></li>
              <li><IonRouterLink routerLink="/games">Store</IonRouterLink></li>
              <li><IonRouterLink routerLink="/home">Wishlist</IonRouterLink></li>
              <li><IonRouterLink routerLink="/support">Support</IonRouterLink></li>
            </ul>
          </div>

          {/* Categorías populares */}
          <div className="footer-section">
            <h3 className="footer-title">CATEGORIES</h3>
            <ul className="footer-links">
              <li><IonRouterLink routerLink="/games">Action</IonRouterLink></li>
              <li><IonRouterLink routerLink="/games">RPG</IonRouterLink></li>
              <li><IonRouterLink routerLink="/games">Adventure</IonRouterLink></li>
              <li><IonRouterLink routerLink="/games">Strategy</IonRouterLink></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-section">
            <h3 className="footer-title">CONTACT</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>support@chestgames.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisora */}
        <div className="footer-divider"></div>

        {/* Sección inferior */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="copyright">
              &copy; {currentYear} ChestGames. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <IonRouterLink routerLink="/support">Privacy Policy</IonRouterLink>
              <span className="separator">|</span>
              <IonRouterLink routerLink="/support">Terms of Service</IonRouterLink>
              <span className="separator">|</span>
              <IonRouterLink routerLink="/support">Cookie Policy</IonRouterLink>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="footer-socials">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
