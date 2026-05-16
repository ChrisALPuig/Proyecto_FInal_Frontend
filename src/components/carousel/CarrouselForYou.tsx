import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CarrouselForYou.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { Game, getGameImageUrl } from '../../services/gameService.js';

interface CarouselForYouProps {
  games: Game[];
}

const formatImageUrl = getGameImageUrl;

const CarouselForYou: React.FC<CarouselForYouProps> = ({ games }) => {
  const history = useHistory();
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const slides = games.slice(0, 4);

  const scrollToIndex = (i: number) => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;

    container.scrollTo({
      left: i * width,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    const nextIndex = (index + 1) % slides.length;
    setIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (index - 1 + slides.length) % slides.length;
    setIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [index, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="recommended">
      <h2 className="recommended-title">{t('recommendedForYou')}</h2>

      <div className="carousel-wrapper">
        <button className="nav-button left" onClick={handlePrev}>
          ‹
        </button>

        <div className="carousel-container" ref={containerRef}>
          {slides.map((game) => (
            <div
              key={game.id}
              className="carousel-slide"
              onClick={() => history.push(`/game/${game.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={formatImageUrl(game)} alt={game.title} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Image'; }} />
              <div className="slide-info">
                <h3>{game.title}</h3>
                <p>${game.price?.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-button right" onClick={handleNext}>
          ›
        </button>
      </div>
    </section>
  );
};

export default CarouselForYou;
