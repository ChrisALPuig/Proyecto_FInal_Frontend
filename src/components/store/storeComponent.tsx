import { useEffect, useMemo, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchGames, fetchIgdbGames, Game, formatImageUrl } from "../../services/gameService";
import LoadingSpinner from "../LoadingSpinner";
import "./storeComponent.css";

const ITEMS_PER_PAGE = 18;
const INITIAL_IGDB_GAMES = 25; // Reducido de 50 para carga más rápida

const categoryFilters = [
  { name: "Classic", genre: "Adventure", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg" },
  { name: "Strategy", genre: "Strategy", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg" },
  { name: "Adventure", genre: "Adventure", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg" },
  { name: "Indie", genre: "Indie", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg" },
  { name: "Role-playing", genre: "RPG", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg" },
];

const genres = ["Action", "Adventure", "Racing", "RPG", "Shooter", "Simulation", "Sports", "Strategy"];
const languages = ["English", "Español", "Français", "Deutsch", "Italiano", "Português"];

const StoreComponent: React.FC = () => {
  const history = useHistory();
  const { t } = useLanguage();
  const [bdGames, setBdGames] = useState<Game[]>([]);
  const [igdbGames, setIgdbGames] = useState<Game[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [onlyFree, setOnlyFree] = useState(false);
  const [includeDLCs, setIncludeDLCs] = useState(false);
  const [hideDLCs, setHideDLCs] = useState(false);
  const [hideOwnedProducts, setHideOwnedProducts] = useState(false);
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedReleaseStatus, setSelectedReleaseStatus] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 231]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Debounce search query - evita muchas peticiones mientras escribe
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500); // Espera 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const displayedGames = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return games.slice(start, start + ITEMS_PER_PAGE);
  }, [games, page]);

  const totalPages = Math.max(1, Math.ceil(games.length / ITEMS_PER_PAGE));

  const loadGames = useCallback(async () => {
    setLoading(true);
    try {
      const hasSearch = debouncedSearch?.trim().length ?? 0 > 0;
      
      // Paso 1: Buscar primero en la BD
      let bdResults: Game[] = [];
      try {
        bdResults = await fetchGames({
          query: hasSearch ? debouncedSearch : undefined,
        });
        console.log("BD results:", bdResults.length, "| Search:", debouncedSearch);
      } catch (error) {
        console.error("Error loading BD games:", error);
      }

      // Paso 2: Si hay búsqueda y se encontraron resultados en BD, usar solo esos
      // Si no hay búsqueda o no se encontraron resultados, completar con IGDB
      let igdbResults: Game[] = [];
      try {
        if (hasSearch && bdResults.length > 0) {
          // Si encontramos resultados en BD, no buscamos en IGDB
          console.log("Using only BD results for search:", debouncedSearch);
          igdbResults = [];
        } else if (!hasSearch) {
          // Si no hay búsqueda, cargar juegos populares de IGDB para llenar la tienda
          igdbResults = await fetchIgdbGames(undefined, INITIAL_IGDB_GAMES);
          console.log("Loading popular games from IGDB:", igdbResults.length);
        } else {
          // Si hay búsqueda pero no hay resultados en BD, buscar en IGDB
          igdbResults = await fetchIgdbGames(debouncedSearch, INITIAL_IGDB_GAMES);
          console.log("IGDB results for search:", igdbResults.length);
        }
      } catch (error) {
        console.error("Error loading IGDB games:", error);
      }

      setBdGames(bdResults);
      setIgdbGames(igdbResults);
    } catch (error) {
      console.error("Error loading games:", error);
      setBdGames([]);
      setIgdbGames([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  const applyFilters = useCallback(() => {
    // Combinar: BD primero (tienen mayor prioridad), luego IGDB
    let combinedGames = [...bdGames];
    
    // Solo agregar IGDB si no hay búsqueda activa o si no hay suficientes resultados de BD
    if (debouncedSearch?.trim().length === 0 || bdGames.length === 0) {
      combinedGames = [...bdGames, ...igdbGames];
    }

    let filteredGames = combinedGames;

    // Aplicar filtros
    if (selectedGenres.length > 0) {
      filteredGames = filteredGames.filter((game) =>
        game.genres?.some((genre) => selectedGenres.includes(genre))
      );
    }

    if (onlyFree) {
      filteredGames = filteredGames.filter((game) => game.price === 0);
    }

    if (onlyDiscounted) {
      filteredGames = filteredGames.filter((game) => game.price !== undefined && game.price < 20);
    }

    // Filtro de rango de precio
    filteredGames = filteredGames.filter((game) => {
      const price = game.price;
      if (price === undefined || price === null) {
        return true;
      }
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filtro de DLCs
    if (hideDLCs) {
      filteredGames = filteredGames.filter((game) =>
        !game.tags?.some((tag) => tag.toLowerCase().includes("dlc")) &&
        !game.features?.some((feature) => feature.toLowerCase().includes("dlc"))
      );
    }

    if (includeDLCs) {
      filteredGames = filteredGames.filter((game) =>
        game.tags?.some((tag) => tag.toLowerCase().includes("dlc")) ||
        game.features?.some((feature) => feature.toLowerCase().includes("dlc"))
      );
    }

    setGames(filteredGames);
    setPage(1);
  }, [bdGames, igdbGames, selectedGenres, onlyFree, onlyDiscounted, priceRange, hideDLCs, includeDLCs, debouncedSearch]);

  useEffect(() => {
    loadGames();
  }, [debouncedSearch, loadGames]);

  useEffect(() => {
    applyFilters();
  }, [bdGames, igdbGames, onlyDiscounted, onlyFree, includeDLCs, hideDLCs, selectedGenres, selectedReleaseStatus, selectedLanguages, priceRange, applyFilters]);

  const toggleGenre = useCallback((genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]
    );
  }, []);

  const formatGameImageUrl = useCallback((game: Game) => {
    const image = game.coverImage || game.images?.[0] || "";
    return formatImageUrl(image);
  }, []);

  const getGameDescription = useCallback((game: Game) => {
    // Use description from IGDB or fallback to story
    if (game.description) {
      return game.description.substring(0, 100) + (game.description.length > 100 ? "..." : "");
    }
    if (game.story) {
      return game.story.substring(0, 100) + (game.story.length > 100 ? "..." : "");
    }
    return "A thrilling adventure packed with action and nostalgia.";
  }, []);

  const handleGameClick = useCallback((gameId: number) => {
    history.push(`/game/${gameId}`);
  }, [history]);

  return (
    <div className="store-content">
      <section className="store-categories-grid">
        {categoryFilters.map((cat) => (
          <div
            key={cat.name}
            className="category-card"
            onClick={() => toggleGenre(cat.genre)}
          >
            <img className="category-image" src={cat.image} alt={`${cat.name} category`} />
            <div className="category-overlay" />
            <span>{cat.name}</span>
          </div>
        ))}
      </section>

      <section className="store-header-bar">
        <div className="store-header-left">
          <div className="store-page-title">{t('pcGamesAllGames')}</div>
          <div className="store-page-subtitle">{games.length.toLocaleString()} {t('gamesInTotal')}</div>
        </div>
        <div className="store-header-right">
          <div className="store-search-top">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchForGames')}
              className="store-top-search-input"
            />
          </div>
          <div className="store-sort-row">
            <span className="sort-label">{t('sortBy')}</span>
            <button type="button" className="sort-button">{t('bestsellingRecently')}</button>
            <div className="view-toggle">
              <button
                type="button"
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ▦
              </button>
              <button
                type="button"
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="store-main">
        <aside className="store-sidebar">
          <div className="sidebar-section">
            <h4>{t('storeSearch')}</h4>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholderStore')}
              className="store-search-input"
            />
          </div>

          <div className="sidebar-section sidebar-intro">
            <div className="sidebar-chip">{t('goodOldGames')}</div>
            <div className="sidebar-filters-group">
              <label className="sidebar-option">
                <input
                  type="checkbox"
                  checked={onlyDiscounted}
                  onChange={() => setOnlyDiscounted((prev) => !prev)}
                />
                <span>{t('showOnlyDiscounted')}</span>
              </label>
              <label className="sidebar-option">
                <input
                  type="checkbox"
                  checked={hideOwnedProducts}
                  onChange={() => setHideOwnedProducts((prev) => !prev)}
                />
                <span>{t('hideAllOwnedProducts')}</span>
              </label>
              <label className="sidebar-option">
                <input
                  type="checkbox"
                  checked={onlyWishlist}
                  onChange={() => setOnlyWishlist((prev) => !prev)}
                />
                <span>{t('showOnlyWishlist')}</span>
              </label>
            </div>
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>{t('dlcs')}</h4>
            <label className="sidebar-option">
              <input
                type="checkbox"
                checked={includeDLCs}
                onChange={() => setIncludeDLCs((prev) => !prev)}
              />
              <span>{t('dlcs')}</span>
            </label>
            <label className="sidebar-option">
              <input
                type="checkbox"
                checked={hideDLCs}
                onChange={() => setHideDLCs((prev) => !prev)}
              />
              <span>{t('hideDlcsAndExtras')}</span>
            </label>
            <label className="sidebar-option">
              <input
                type="checkbox"
                checked={onlyFree}
                onChange={() => setOnlyFree((prev) => !prev)}
              />
              <span>{t('showOnlyFreeGames')}</span>
            </label>
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>{t('priceRange')}</h4>
            <div className="price-range-row">
              <span>{priceRange[0].toFixed(2)}€</span>
              <span>{priceRange[1].toFixed(2)}€</span>
            </div>
            <input
              className="price-range-slider"
              type="range"
              min={0}
              max={250}
              step={1}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            />
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>{t('releaseStatus')}</h4>
            {[
              { label: t('newArrivals'), value: "new-arrivals" },
              { label: t('upcoming'), value: "upcoming" },
              { label: t('earlyAccess'), value: "early-access" },
            ].map((item) => (
              <label key={item.value} className="sidebar-option">
                <input
                  type="checkbox"
                  checked={selectedReleaseStatus.includes(item.value)}
                  onChange={() =>
                    setSelectedReleaseStatus((prev) =>
                      prev.includes(item.value)
                        ? prev.filter((status) => status !== item.value)
                        : [...prev, item.value]
                    )
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>{t('genres')}</h4>
            {genres.map((genre) => (
              <label key={genre} className="sidebar-option">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>{t('languages')}</h4>
            {languages.map((language) => (
              <label key={language} className="sidebar-option">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language)}
                  onChange={() =>
                    setSelectedLanguages((prev) =>
                      prev.includes(language)
                        ? prev.filter((item) => item !== language)
                        : [...prev, language]
                    )
                  }
                />
                <span>{language}</span>
              </label>
            ))}
          </div>
        </aside>

        <div className={`store-grid ${viewMode === 'list' ? 'list-mode' : ''}`}>
          {loading ? (
            <LoadingSpinner message={t('loading') || 'Cargando'} fullScreen={false} />
          ) : displayedGames.length > 0 ? (
            displayedGames.map((game) => (
              <div key={game.id} className="game-card" onClick={() => handleGameClick(game.id)}>
                <div className="game-card-image-container">
                  <img 
                    className="game-card-image" 
                    src={formatGameImageUrl(game)} 
                    alt={game.title}
                    loading="lazy"
                  />
                  <div className="game-card-top-chip">PC</div>
                  {game.trailerVideo && (
                    <div className="game-card-trailer-badge">
                      🎬 {t('trailer')}
                    </div>
                  )}
                  <div className="game-card-overlay" />
                </div>
                <div className="game-card-details">
                  <div className="game-title">{game.title}</div>
                  {game.genres && game.genres.length > 0 && (
                    <div className="game-genres">
                      {game.genres.slice(0, 2).map((genre, idx) => (
                        <span key={idx} className="genre-tag">{genre}</span>
                      ))}
                    </div>
                  )}
                  <div className="game-description">{getGameDescription(game)}</div>
                  <div className="game-card-footer">
                    <span className="game-price">
                      {game.price === undefined || game.price === null
                        ? t('tbd')
                        : game.price === 0
                        ? t('free')
                        : `${game.price.toFixed(2)}€`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              {t('noGamesFound')}
            </div>
          )}
        </div>
      </section>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          {t('prev')}
        </button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default StoreComponent;
