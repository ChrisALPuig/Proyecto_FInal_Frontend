import '../doom/css/doomContainer.css';
import { IonRouterLink } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useCart } from '../../../contexts/useCart.ts';
import { useAlert } from '../../../contexts/AlertContext.tsx';
import { useLanguage } from '../../../contexts/LanguageContext.tsx';
import ImagenToggle from '../../carrito/fav.tsx';
import { translateText, LanguageCode } from '../../../services/translationService.ts';

const DoomContainer: React.FC = () => {
  const { addToCart } = useCart();
  const { showErrorAlert, showLoginRequiredAlert } = useAlert();
  const { t, language } = useLanguage();

  const [translatedContent, setTranslatedContent] = useState({
    description: "",
    story: "",
    sysReqMin: "",
    sysReqRec: "",
  });
  const [translating, setTranslating] = useState(false);

  const images = [
    "/assets/images/doom-2016.jpg",
    "/assets/images/doom/doom1.jpg",
    "/assets/images/doom/doom2.jpg",
    "/assets/images/doom/doom3.jpg",
    "/assets/images/doom/doom4.jpg",
    "/assets/images/doom/doom5.jpg",
    "/assets/images/doom/doom6.jpg",
    "/assets/images/doom/doom7.jpg"
  ];

  const [imagesPerPage, setImagesPerPage] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImagesPerPage(1);
      } else if (window.innerWidth <= 1024) {
        setImagesPerPage(2); // Para tablet: mostrar 2 imágenes
      } else {
        setImagesPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Traducir contenido cuando cambia el idioma
  useEffect(() => {
    const translateDoomContent = async () => {
      setTranslating(true);
      const langCode: LanguageCode = language === "Español" ? "es" : "en";

      try {
        // Contenido original en inglés
        const description = "Developed by id software, the studio that pioneered the first-person shooter genre and created multiplayer Deathmatch, DOOM returns as a brutally fun and challenging modern-day shooter experience. Relentless demons, impossibly destructive guns, and fast, fluid movement provide the foundation for intense, first-person combat.";
        const story = "You've come here for a reason. The Union Aerospace Corporation's massive research facility on Mars is overwhelmed by fierce and powerful demons, and only one person stands between their world and ours. As the lone DOOM Marine, you've been activated to do one thing – kill them all.";
        const sysReqMin = "OS: Windows 10, Processor: Intel Core i5-2400 / AMD FX-8320 or better, Memory: 8 GB RAM, Graphics: NVIDIA GTX 670 / AMD Radeon HD 7870, DirectX: Version 11, Storage: 55 GB available space";
        const sysReqRec = "OS: Windows 10, Processor: Intel Core i7-3970 / AMD Ryzen 5 1600, Memory: 16 GB RAM, Graphics: NVIDIA GTX 1070 / AMD Vega 56, DirectX: Version 12, Storage: 55 GB SSD";

        const translated1 = await translateText(description, langCode);
        const translated2 = await translateText(story, langCode);
        const translated3 = await translateText(sysReqMin, langCode);
        const translated4 = await translateText(sysReqRec, langCode);

        setTranslatedContent({
          description: translated1,
          story: translated2,
          sysReqMin: translated3,
          sysReqRec: translated4,
        });
      } catch (err) {
        console.error("Translation error:", err);
      } finally {
        setTranslating(false);
      }
    };

    translateDoomContent();
  }, [language]);

  const nextSlide = () => {
    const maxIndex = Math.floor(images.length / imagesPerPage) * imagesPerPage - imagesPerPage;
    if (currentIndex + imagesPerPage < images.length) {
      setCurrentIndex(currentIndex + imagesPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - imagesPerPage >= 0) {
      setCurrentIndex(currentIndex - imagesPerPage);
    }
  };

  // 🚀 Función que añade el juego al carrito
  const handleAddToCart = async () => {
    try {
      await addToCart({
        id: 'doom-2016',
        name: 'DOOM (2016)',
        price: 19.99,
        image: '/assets/images/doom-2016.jpg',
        quantity: 1,
      });
      console.log("Producto añadido al carrito");
    } catch (err: any) {
      console.error("Error adding to cart:", err);
      const errorMessage = err?.message || t("failedAddToCart");
      if (errorMessage.includes("iniciar sesión")) {
        showLoginRequiredAlert();
      } else {
        showErrorAlert(errorMessage);
      }
    }
  };

  return (
    <div className="doom-hero">

      {/* VIDEO HERO */}
      <div className="doom-video-container">
        <video
          className="doom-video"
          src="/assets/videos/doomfondo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* CARRUSEL ARRIBA DEL TODO */}
      <div className="doom-carousel">

        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}>
            <div
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className="close-btn"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </span>

              {selectedImage === "video" ? (
                <iframe
                  width="900"
                  height="500"
                  src="https://www.youtube.com/embed/l5XQ4zABINA?autoplay=1"
                  title="Doom Trailer"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    borderRadius: "10px"
                  }}
                />
              ) : (
                <img src={selectedImage} alt="Imagen ampliada" />
              )}
            </div>
          </div>
        )}

        <button className="carousel-btn left" onClick={prevSlide}>‹</button>

        <div className="carousel-window">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / imagesPerPage)}%)`,
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="carousel-item"
                onClick={() => {
                  if (index === 0) {
                    setSelectedImage("video");
                  } else {
                    setSelectedImage(img);
                  }
                }}
              >
                <img src={img} alt="Doom screenshot" />

                {index === 0 && (
                  <img
                    src="/assets/images/play-button.png"
                    alt="Play"
                    className="play-overlay"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-btn right" onClick={nextSlide}>›</button>
      </div>

      {/* TITULO */}
      <p className="doom-nombre">DOOM (2016)</p>

      {/* CARD DEBAJO DEL TITULO */}
      <div className="doom-card">
        <h1>DOOM</h1>
        <p className="edition">Edición Deluxe</p>
        <p className="price">19.99€</p>

        <div className="botones">
          <button 
            className="add-to-cart"
            onClick={handleAddToCart}
          >
            {t("addToCart")}
          </button>
          <IonRouterLink routerLink="/carrito-juego">
            <button className="buy-now">{t("buyNow")}</button>
          </IonRouterLink>
        </div>

        <div className="wishlist-section">
          <ImagenToggle 
            itemId="doom-2016"
            itemName="DOOM (2016)"
            itemPrice={19.99}
            itemImage="/assets/images/doom-2016.jpg"
          />
          <span className="wishlist-text">{t("wishlist")}</span>
        </div>
      </div>

      {/* CONTENIDO INFERIOR */}
      <div className="doom-info-container">
        {/* Lado izquierdo: Description */}
        <div className="doom-description">
          <h2>{t("description")}</h2>
          <p>
            {translating ? "..." : translatedContent.description || "Developed by id software, the studio that pioneered the first-person shooter genre and created multiplayer Deathmatch, DOOM returns as a brutally fun and challenging modern-day shooter experience. Relentless demons, impossibly destructive guns, and fast, fluid movement provide the foundation for intense, first-person combat."}
          </p>
          <video className="doom-description-video" src="/assets/videos/doom-description.mp4" autoPlay muted loop playsInline />
          <h2>{t("story")}</h2>
          <p>
            {translating ? "..." : translatedContent.story || "You've come here for a reason. The Union Aerospace Corporation's massive research facility on Mars is overwhelmed by fierce and powerful demons, and only one person stands between their world and ours. As the lone DOOM Marine, you've been activated to do one thing – kill them all."}
          </p>
          <h2>{t("relentlessCampaign")}</h2>
          <p>
            There is no taking cover or stopping to regenerate health as you beat back Hell’s raging demon hordes. Combine your arsenal of futuristic and iconic guns, upgrades, movement and an advanced melee system to knock-down, slash, stomp, crush, and blow apart demons in creative and violent ways.  
          </p>
          {/* Nuevo apartado: System Requirements */}
          <div className="doom-system-requirements">
            <h2>{t("systemRequirements")}</h2>

            <div className="system-requirements-columns">
              {/* Requisitos mínimos */}
              <div className="requirements-column">
                <h3>{t("minimum")}</h3>
                <ul>
                  <li><strong>OS:</strong> Windows 10</li>
                  <li><strong>Processor:</strong> Intel Core i5-2400 / AMD FX-8320 or better</li>
                  <li><strong>Memory:</strong> 8 GB RAM</li>
                  <li><strong>Graphics:</strong> NVIDIA GTX 670 / AMD Radeon HD 7870</li>
                  <li><strong>DirectX:</strong> Version 11</li>
                  <li><strong>Storage:</strong> 55 GB available space</li>
                </ul>
              </div>

              {/* Requisitos recomendados */}
              <div className="requirements-column">
                <h3>{t("recommended")}</h3>
                <ul>
                  <li><strong>OS:</strong> Windows 10 / 11</li>
                  <li><strong>Processor:</strong> Intel Core i7-3770 / AMD FX-8350 or better</li>
                  <li><strong>Memory:</strong> 8 GB RAM</li>
                  <li><strong>Graphics:</strong> NVIDIA GTX 970 / AMD Radeon R9 290</li>
                  <li><strong>DirectX:</strong> Version 11</li>
                  <li><strong>Storage:</strong> 55 GB available space</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho: Game Details + Game Features */}
        <div className="doom-right-panel">
          <div className="doom-game-details">
            <h2>{t("gameDetails")}</h2>
            <ul>
              <li><strong>{t("genre")}</strong> Shooter - FPP - Sci-fi</li>
              <li><strong>{t("tags")}</strong> Atmospheric, Sci-fi, Science, First-Person, Great Soundtrack</li>
              <li><strong>{t("worksOn")}</strong> Windows (10, 11)</li>
              <li><strong>{t("releaseDate")}</strong> May 13, 2016</li>
              <li><strong>{t("company")}</strong> id Software / Bethesda Softworks LLC</li>
              <li><strong>{t("size")}</strong> 63.4 GB</li>
              <li><strong>{t("rating")}</strong> PEGI Rating: 18+ (Bad Language, Violence)</li>
            </ul>
          </div>

          <div className="doom-features">
            <h2>{t("gameFeatures")}</h2>
            <ul>
              <li>
                <span className="feature-icon">🏆</span> {t("achievements")}
              </li>
              <li>
                <span className="feature-icon">☁️</span> {t("cloudSaves")}
              </li>
              <li>
                <span className="feature-icon">🎮</span> {t("controllerSupport")}
              </li>
              <li>
                <span className="feature-icon">👤</span> {t("singlePlayer")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoomContainer;