import { IonRouterLink } from "@ionic/react";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/useCart.tsx";
import { useAlert } from "../../contexts/AlertContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import ImagenToggle from "../carrito/fav.tsx";
import CartPopover from "../carrito/CartPopover.tsx";
import { useHistory } from "react-router";
import { fetchGameById, formatImageUrl } from "../../services/gameService.ts";
import { translateGameContent, LanguageCode } from "../../services/translationService.ts";
import './css/doomContainer.css';

import { Game } from "../../services/gameService.ts";

interface GamePageProps {
  gameId: number;
}

const GamePage: React.FC<GamePageProps> = ({ gameId }) => {
  const { addToCart } = useCart();
  const { showErrorAlert, showLoginRequiredAlert } = useAlert();
  const { t, language } = useLanguage();
  const [game, setGame] = useState<Game | null>(null);
  const [translatedGame, setTranslatedGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagesPerPage, setImagesPerPage] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false); // controla popover
  const history = useHistory(); 

  // Traer datos del juego
  useEffect(() => {
    if (!gameId) {
      setError("Game ID not found");
      setLoading(false);
      return;
    }
    
    console.log("Fetching game with ID:", gameId);
    setLoading(true);
    setError(null);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundo timeout
    
    fetchGameById(gameId)
      .then(data => {
        clearTimeout(timeoutId);
        console.log("✅ Game data fetched successfully:", data);
        if (!data) {
          setError("No game data received");
          setLoading(false);
          return;
        }
        const safeData: Game = {
          ...data,
          id: data.id || gameId,
          images: (data.images || []).map(img => formatImageUrl(img)),
          coverImage: formatImageUrl(data.coverImage),
          genres: data.genres || [],
          tags: data.tags || [],
          features: data.features || [],
        };
        console.log("✅ Safe game data prepared:", safeData);
        setGame(safeData);
        setLoading(false);

        // Precargar imágenes
        (safeData.images || []).forEach(src => { 
          const img = new Image(); 
          img.src = src; 
        });
      })
      .catch(err => {
        clearTimeout(timeoutId);
        console.error("❌ Error fetching game:", err);
        console.error("❌ Error message:", err?.message);
        console.error("❌ Stack:", err?.stack);
        const errorMsg = err?.message || "Failed to load game";
        setError(errorMsg);
        setLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, [gameId]);

  // Traducir contenido del juego cuando cambia el idioma
  useEffect(() => {
    if (!game) return;

    const translateContent = async () => {
      setTranslating(true);
      try {
        const langCode: LanguageCode = language === "Español" ? "es" : "en";
        const translated = await translateGameContent(
          {
            description: game.description,
            story: game.story,
            systemRequirementsMin: game.systemRequirementsMin,
            systemRequirementsRecommended: game.systemRequirementsRecommended,
            genres: game.genres,
            tags: game.tags,
            features: game.features,
          },
          langCode
        );

        setTranslatedGame({
          ...game,
          ...translated,
        });
      } catch (err) {
        console.error("Translation error:", err);
        setTranslatedGame(game);
      } finally {
        setTranslating(false);
      }
    };

    translateContent();
  }, [game, language]);

  // Control de cantidad de imágenes por tamaño
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setImagesPerPage(1);
      else if (window.innerWidth <= 1024) setImagesPerPage(2);
      else setImagesPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return (
    <div style={{ 
      padding: '40px 20px', 
      color: '#fff', 
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#121212'
    }}>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{t("loadingGame")}</p>
      <p style={{ fontSize: '0.9rem', color: '#999' }}>Game ID: {gameId}</p>
    </div>
  );
  if (error) return (
    <div style={{ 
      color: '#ff6b6b', 
      padding: '40px 20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#121212'
    }}>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Error: {error}</p>
      <p style={{ fontSize: '0.9rem', color: '#999' }}>Game ID: {gameId}</p>
      <p style={{ fontSize: '0.9rem', color: '#999' }}>Check the browser console for more details</p>
    </div>
  );
  if (!game) return (
    <div style={{ 
      padding: '40px 20px', 
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#121212'
    }}>
      <p style={{ fontSize: '1.2rem' }}>{t("gameNotFound")}</p>
    </div>
  );

  const maxIndex = Math.max(0, (game.images?.length || 0) - imagesPerPage);
  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + imagesPerPage, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - imagesPerPage, 0));

  // Añadir al carrito y abrir popover
  const handleAddToCart = async () => {
    if (!game || game.price === undefined) return;
    try {
      await addToCart({
        id: game.id.toString(),
        name: game.title,
        price: game.price,
        image: game.coverImage || "",
        quantity: 1,
      });
      setIsCartOpen(true); // abre el popover
    } catch (err: any) {
      const errorMessage = err?.message || t("failedAddToCart");
      if (errorMessage.includes("iniciar sesión")) {
        showLoginRequiredAlert();
      } else {
        showErrorAlert(errorMessage);
      }
    }
  };

  const handleBuyNow = async () => {
    if (!game || game.price === undefined) return;
    try {
      await addToCart({
        id: game.id.toString(),
        name: game.title,
        price: game.price,
        image: game.coverImage || "",
        quantity: 1,
      });
      history.push("/carrito-juego"); // redirección automática
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

  const trailerUrl = game.heroVideo || game.trailerVideo;
  const heroCoverSrc = game.coverImage || game.images?.[0] || "";
  const isYoutubeVideo = (videoUrl?: string) => !!videoUrl && /(youtube\.com|youtu\.be)/.test(videoUrl);
  const getYoutubeEmbedUrl = (videoUrl: string) => {
    const match = videoUrl.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
    return match
      ? `https://www.youtube.com/embed/${match[1]}?rel=0&autoplay=1&mute=1&controls=1&modestbranding=1&showinfo=0&playsinline=1`
      : videoUrl;
  };
  const trailerEmbedUrl = trailerUrl && isYoutubeVideo(trailerUrl) ? getYoutubeEmbedUrl(trailerUrl) : undefined;
  const hasTrailer = Boolean(trailerUrl);

  return (
    <div className="doom-hero">
      {/* HERO COVER IMAGE */}
      {heroCoverSrc && heroCoverSrc !== 'https://via.placeholder.com/300x400?text=No+Image' ? (
        <div className="doom-video-container">
          <img
            className="doom-video"
            src={heroCoverSrc}
            alt={`${game.title} portada`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      ) : (
        <div className="doom-video-container" style={{ backgroundColor: '#1a1a1a', minHeight: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
            {t("loadingGame")}
          </div>
        </div>
      )}

      {/* CARRUSEL DE IMÁGENES Y TRAILER */}
      {(game.images && game.images.length > 0) && (
        <div className="doom-carousel">
          {selectedImage && (
            <div className="image-modal" onClick={() => setSelectedImage(null)}>
              <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-btn" onClick={() => setSelectedImage(null)}>✕</span>
                {selectedImage === "video" && trailerUrl ? (
                  trailerEmbedUrl ? (
                    <iframe
                      title={`${game.title} trailer`}
                      src={trailerEmbedUrl}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "10px", width: '100%', height: '100%' }}
                    />
                  ) : (
                    <video
                      src={trailerUrl}
                      autoPlay
                      controls
                      loop
                      style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "10px" }}
                    />
                  )
                ) : (
                  <img src={selectedImage} alt={`${game.title}`} />
                )}
              </div>
            </div>
          )}

          <button className="carousel-btn left" onClick={prevSlide} disabled={currentIndex === 0} style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}>‹</button>

          <div className="carousel-window">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * (100 / imagesPerPage)}%)`, transition: "transform 0.5s ease" }}>
              {game.images.map((img, i) => (
                <div key={i} className="carousel-item" onClick={() => setSelectedImage(i === 0 && hasTrailer ? "video" : img)}>
                  <img src={img} alt={`${game.title} screenshot ${i + 1}`} />
                  {i === 0 && hasTrailer && <img src="/assets/images/play-button.png" alt="Play" className="play-overlay" />}
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn right" onClick={nextSlide} disabled={currentIndex >= maxIndex} style={{ opacity: currentIndex >= maxIndex ? 0.3 : 1 }}>›</button>
        </div>
      )}

      {/* CARD DEL JUEGO */}
      <div className="doom-card">
        <h1>{game.title}</h1>
        <p className="edition">{game.edition}</p>
        
        {/* Géneros de IGDB */}
        {game.genres && game.genres.length > 0 && (
          <div className="game-genres-container">
            {game.genres.slice(0, 4).map((genre, idx) => (
              <span key={idx} className="genre-badge">{genre}</span>
            ))}
          </div>
        )}
        
        <p className="price">{game.price}€</p>

        <div className="botones">
          <button className="add-to-cart" onClick={handleAddToCart}>{t("Add to Cart")}</button>
          <button className="buy-now" onClick={handleBuyNow}>
            {t("Buy Now")}
          </button>
        </div>

        <div className="wishlist-section">
          <ImagenToggle itemId={game.id.toString()} itemName={game.title} itemPrice={game.price} itemImage={game.coverImage} />
          <span className="wishlist-text">{t("wishlist")}</span>
        </div>
      </div>

      {/* INFORMACIÓN DEL JUEGO */}
      <div className="doom-info-container">
        <div className="doom-description">
          <h2>{t("Description")}</h2>
          <p>{translating ? "..." : translatedGame?.description || game?.description}</p>

          {game.descriptionVideo && (
            <video
              className="doom-description-video"
              src={game.descriptionVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', borderRadius: '10px', margin: '20px 0' }}
            />
          )}

          <h2>{t("Story")}</h2>
          <p>{translating ? "..." : translatedGame?.story || game?.story}</p>

          <h2>{t("System Requirements")}</h2>
          <p><strong>{t("Minimum:")}</strong> {translating ? "..." : translatedGame?.systemRequirementsMin || game?.systemRequirementsMin}</p>
          <p><strong>{t("Recommended:")}</strong> {translating ? "..." : translatedGame?.systemRequirementsRecommended || game?.systemRequirementsRecommended}</p>
        </div>

        <div className="doom-right-panel">
          <div className="doom-game-details">
            <h2>{t("Game Details")}</h2>
            <ul>
              {(translatedGame?.genres || game?.genres || []).map((g, i) => <li key={i}><strong>{t("genre")}</strong> {g}</li>)}
              {(translatedGame?.tags || game?.tags || []).map((t_item, i) => <li key={i}><strong>{t("tag")}</strong> {t_item}</li>)}
            </ul>
          </div>

          <div className="doom-features">
            <h2>{t("Game Features")}</h2>
            <ul>
              {(translatedGame?.features || game?.features || []).map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* POPOVER DEL CARRITO */}
      <CartPopover
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default GamePage;