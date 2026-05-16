import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./CarouselJuego.css";
import { useHistory } from "react-router-dom"; // v5

// Array de juegos
const videojuegos = [
  { id: 1, nombre: "Doom", img: "/doom.jpg" },
  { id: 2, nombre: "ETS2", img: "/ciber.jpg" },
  { id: 3, nombre: "The Last of Us", img: "/thelast.png" },
  { id: 4, nombre: "Sekiro", img: "/sekiro.jpg" },
];

const CarouselJuegos: React.FC = () => {
  const history = useHistory(); // v5

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {videojuegos.map((juego) => (
          <SwiperSlide key={juego.id}>
            <div
              className="card"
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/game/${juego.id}`)} // v5
            >
              <img
                src={juego.img}
                alt={juego.nombre}
                className="card-image"
              />
              <div className="card-overlay">{juego.nombre}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselJuegos;