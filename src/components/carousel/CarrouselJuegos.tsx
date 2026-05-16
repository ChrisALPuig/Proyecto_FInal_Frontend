import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./CarrouselJuego.css";
import { useHistory } from "react-router-dom";
import { Game, getGameImageUrl } from '../../services/gameService.js';

interface CarouselJuegosProps {
  games: Game[];
}

const formatImageUrl = getGameImageUrl;

const CarouselJuegos: React.FC<CarouselJuegosProps> = ({ games }) => {
  const history = useHistory();
  const slides = games.slice(0, 4);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 }
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {slides.map((game) => (
          <SwiperSlide key={game.id}>
            <div
              className="card"
              onClick={() => history.push(`/game/${game.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={formatImageUrl(game)}
                alt={game.title}
                className="card-image"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Image'; }}
              />
              <div className="card-overlay">
                {game.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselJuegos;