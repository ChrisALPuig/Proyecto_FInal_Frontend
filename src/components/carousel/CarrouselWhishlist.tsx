import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CarrouselWishlist.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { Game, getGameImageUrl } from '../../services/gameService.js';

interface CarrouselWhishlistProps {
  games: Game[];
}

const ITEMS_PER_PAGE = 3;

const CarrouselWhishlist: React.FC<CarrouselWhishlistProps> = ({ games }) => {
  const history = useHistory();
  const { t } = useLanguage();
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(games.length / ITEMS_PER_PAGE));

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const start = page * ITEMS_PER_PAGE;
  const visibleGames = games.slice(start, start + ITEMS_PER_PAGE);

  return (
    <section className="wishlist-grid-section">

      {/* HEADER */}
      <div className="wishlist-header">
        <h2 className="wishlist-title">{t('topWishlisted')}</h2>

        <div className="wishlist-controls">
          <button onClick={handlePrev} className="nav-btn">‹</button>
          <span className="page-indicator">
            {page + 1} / {totalPages}
          </span>
          <button onClick={handleNext} className="nav-btn">›</button>
        </div>
      </div>

      {/* GRID */}
      <div className="wishlist-grid">
        {visibleGames.map((game, index) => {
          const globalIndex = start + index;

          return (
            <div
              key={game.id}
              className={`wishlist-card ${globalIndex === 0 ? 'top-one' : ''}`}
              onClick={() => history.push(`/game/${game.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="rank">#{globalIndex + 1}</div>

              <div className="img-container">
                <img src={getGameImageUrl(game)} alt={game.title} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Image'; }} />
              </div>

              <div className="card-info">
                <h3>{game.title}</h3>
                <p>${game.price?.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CarrouselWhishlist;