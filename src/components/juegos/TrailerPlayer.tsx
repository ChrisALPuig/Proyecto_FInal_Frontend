import React, { useState } from "react";
import "./css/trailerPlayer.css";

interface TrailerPlayerProps {
  trailerVideo?: string;
  title: string;
}

const TrailerPlayer: React.FC<TrailerPlayerProps> = ({ trailerVideo, title }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!trailerVideo) {
    return null;
  }

  const getYouTubeEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  };

  const isYouTubeUrl = trailerVideo.includes("youtube") || trailerVideo.includes("youtu.be");
  const youtubeId = isYouTubeUrl
    ? trailerVideo.split("v=")[1] || trailerVideo.split("/").pop()
    : null;

  return (
    <div className="trailer-section">
      <div className="trailer-header">
        <h2>🎬 Trailer</h2>
        <button
          className="watch-trailer-btn"
          onClick={() => setShowTrailer(true)}
        >
          Watch Trailer
        </button>
      </div>

      {showTrailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="trailer-close-btn"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>
            {isYouTubeUrl && youtubeId ? (
              <iframe
                width="100%"
                height="600"
                src={getYouTubeEmbedUrl(youtubeId)}
                title={`${title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "12px" }}
              />
            ) : (
              <video
                width="100%"
                height="auto"
                src={trailerVideo}
                autoPlay
                controls
                style={{ maxHeight: "80vh", borderRadius: "12px" }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailerPlayer;
