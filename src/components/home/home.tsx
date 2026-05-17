
import React, { useEffect, useState, useCallback } from 'react';
import { IonContent, IonIcon, IonRouterLink } from '@ionic/react';
import { logoWindows, logoApple } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import './home.css';
import LoadingSpinner from '../LoadingSpinner.tsx';
import CarouselJuegos from '../carousel/CarrouselJuegos.js';
import CarouselForYou from '../carousel/CarrouselForYou.js';
import CarrouselWhishlist from '../carousel/CarrouselWhishlist.js';
import Footer from '../Footer/Footer';
import { useWishlist } from '../../contexts/useWishlist.ts';
import { useLanguage } from '../../contexts/LanguageContext';
import { fetchGames, Game, getGameImageUrl } from '../../services/gameService.js';

interface HomeBienProps {
  initialAuthMode?: 'login' | 'register' | null;
}

const HomeBien: React.FC<HomeBienProps> = ({ initialAuthMode }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const { wishlistItems } = useWishlist();
  const { t } = useLanguage();

  const loadGames = useCallback(async () => {
    try {
      const fetchedGames = await fetchGames();
      setGames(fetchedGames);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const featuredOffers = games.slice(0, 3);

  const cgModsGames = games.slice(4, 10);
  const cgModsPages = Array.from(
    { length: Math.ceil(cgModsGames.length / 3) },
    (_, pageIndex) => cgModsGames.slice(pageIndex * 3, pageIndex * 3 + 3)
  );

  const displayedBestsellers = games.slice(0, 4);
  const displayedNewReleases = games.slice(4, 8).length ? games.slice(4, 8) : games.slice(0, 4);

  const topWishlistGames: Game[] = wishlistItems.map((item) => ({
    id: Number(item.id),
    title: item.name,
    price: item.price,
    coverImage: item.image,
    images: [item.image],
  }));

  const getCoverImage = getGameImageUrl;

  if (loading) {
    return (
      <IonContent fullscreen className="home-content">
        <LoadingSpinner message={t('loading') || 'Cargando'} fullScreen={false} />
      </IonContent>
    );
  }

  return (
    <IonContent fullscreen className="home-content">
      <div
        className="hero-background"
        style={{ backgroundImage: "url('/FondoInicio.png')" }}
      />

        <div className="main-content">
          <h1 className="section-title">{t('highlightSection')}</h1>
          <div className="section-divider"></div>

          <CarouselJuegos games={games} />

          <section className="special-offers-section">
            <div className="special-offers-header">
              <span>{t('specialOffers')}</span>
            </div>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                768: { slidesPerView: 1.25, spaceBetween: 20 },
                1024: { slidesPerView: 1.5, spaceBetween: 24 },
              }}
            >
              {featuredOffers.map((game) => (
                <SwiperSlide key={game.id}>
                  <IonRouterLink routerLink={`/game/${game.id}`} className="special-offer-card-link">
                    <div className="special-offer-card">
                      <img src={getCoverImage(game)} alt={game.title} className="offer-image" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Image'; }} />
                      <div className="offer-badge">-30%</div>
                      <div className="offer-content">
                        <div className="offer-label">{t('specialOffer')}</div>
                        <div className="offer-title">{game.title}</div>
                        <div className="offer-prices">
                          <span className="offer-price">{game.price?.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  </IonRouterLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* CATEGORIES */}
          <section className="home-categories-grid">
            {[
              { name: t('classic'), image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg' },
              { name: t('strategy'), image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg' },
              { name: t('adventure'), image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg' },
              { name: t('indie'), image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg' },
              { name: t('rolePlaying'), image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg' },
            ].map((cat) => (
              <div key={cat.name} className="category-card">
                <img className="category-image" src={cat.image} alt={`${cat.name} category`} />
                <div className="category-overlay" />
                <span>{cat.name}</span>
              </div>
            ))}
          </section>
        
        {/* Carrousel Juegos Recomendados */}

          <CarouselForYou games={games} />

          <section className="cgmods-section">
            <div className="cgmods-header">
              <h2>{t('cgMods')}</h2>
              <span>{t('seeMore')}</span>
            </div>
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3600, disableOnInteraction: false }}
              className="cgmods-swiper"
            >
              {cgModsPages.map((page, pageIndex) => (
                <SwiperSlide key={pageIndex}>
                  <div className="cgmods-layout">
                    <div className="cgmods-row top-row">
                      {page.slice(0, 3).map((game) => (
                        <IonRouterLink key={game.id} routerLink={`/game/${game.id}`} className="cgmod-card-link">
                          <div className="cgmod-card">
                            <img src={getCoverImage(game)} alt={game.title} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Image'; }} />
                            <div className="cgmod-info">
                              <span className="cgmod-badge">MOD</span>
                              <h3>{game.title}</h3>
                              <div className="cgmod-price">{game.price?.toFixed(2)}€</div>
                            </div>
                          </div>
                        </IonRouterLink>
                      ))}
                    </div>
                    <div className="cgmods-row bottom-row">
                      {page.slice(3).map((game) => (
                        <IonRouterLink key={game.id} routerLink={`/game/${game.id}`} className="cgmod-card-link">
                          <div className="cgmod-card">
                            <img src={getCoverImage(game)} alt={game.title} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Image'; }} />
                            <div className="cgmod-info">
                              <span className="cgmod-badge">MOD</span>
                              <h3>{game.title}</h3>
                              <div className="cgmod-price">{game.price?.toFixed(2)}€</div>
                            </div>
                          </div>
                        </IonRouterLink>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          <div className="contenedor">

            {/* ================= BESTSELLERS ================= */}
            <div className="columna">
              <h2 className="column-title">{t('bestsellers')}</h2>
              {displayedBestsellers.map((game) => (
                <IonRouterLink key={game.id} routerLink={`/game/${game.id}`} className="juego-link">
                  <div className="juego">
                    <img src={getCoverImage(game)} alt={game.title} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Image'; }} />
                    <div className="info">
                      <div className="titulo">{game.title}</div>
                      <div className="iconos">
                        <IonIcon icon={logoWindows} />
                        <IonIcon icon={logoApple} />
                      </div>
                    </div>
                    <div className="precio">{game.price?.toFixed(2)}€</div>
                  </div>
                </IonRouterLink>
              ))}
            </div>
            {/* ================= NEW RELEASES ================= */}
            <div className="columna">
              <h2 className="column-title">{t('newReleases')}</h2>
              {displayedNewReleases.map((game) => (
                <IonRouterLink key={game.id} routerLink={`/game/${game.id}`} className="juego-link">
                  <div className="juego">
                    <img src={getCoverImage(game)} alt={game.title} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Image'; }} />
                    <div className="info">
                      <div className="titulo">{game.title}</div>
                      <div className="iconos">
                        <IonIcon icon={logoWindows} />
                        <IonIcon icon={logoApple} />
                      </div>
                    </div>
                    <div className="precio">{game.price?.toFixed(2)}€</div>
                  </div>
                </IonRouterLink>
              ))}
            </div>
          </div>

          {topWishlistGames.length > 0 && (
            <section className="wishlist-top-section">
              <CarrouselWhishlist games={topWishlistGames} />
            </section>
          )}
          
        </div>

        <Footer />
      </IonContent>
    );
};

export default HomeBien;
