import { API_ENDPOINTS } from '../config/apiConfig';

export interface Game {
  id: number;
  title: string;
  price?: number;
  coverImage?: string;
  images?: string[];
  genres?: string[];
  tags?: string[];
  features?: string[];
  description?: string;
  story?: string;
  trailerVideo?: string;
  heroVideo?: string;
  descriptionVideo?: string;
  edition?: string;
  systemRequirementsMin?: string;
  systemRequirementsRecommended?: string;
}

export function getGameImageUrl(game: Game): string {
  const image = game.coverImage || game.images?.[0] || '';
  return formatImageUrl(image);
}

import { API_ENDPOINTS } from '../config/apiConfig';

const BASE_URL = API_ENDPOINTS.GAMES;
const IGDB_BASE_URL = API_ENDPOINTS.IGDB;

function buildQueryString(params: Record<string, string | number | boolean | undefined | string[] | null>) {
  return Object.entries(params)
    .flatMap(([key, value]) => {
      if (value === undefined || value === null) {
        return [];
      }

      if (Array.isArray(value)) {
        return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
      }

      return [`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`];
    })
    .join("&");
}

export async function fetchGames(options?: {
  query?: string;
  genres?: string[];
  free?: boolean;
  discounted?: boolean;
  filter?: string;
}) {
  const params = {
    query: options?.query?.trim() ? options.query : undefined,
    genres: options?.genres && options.genres.length > 0 ? options.genres : undefined,
    free: options?.free ? true : undefined,
    discounted: options?.discounted ? true : undefined,
    filter: options?.filter && options.filter !== "all" ? options.filter : undefined,
  };

  const queryString = buildQueryString(params);
  const url = queryString ? `${BASE_URL}/search?${queryString}` : `${BASE_URL}/search`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load games: ${response.statusText}`);
  }

  return (await response.json()) as Game[];
}

type IgdbResponseItem = {
  id: number;
  name: string;
  summary?: string;
  storyline?: string;
  coverUrl?: string;
  screenshots?: string[];
  videos?: string[];
  genres?: string[];
  price?: number;
};

function mapIgdbResponseToGame(item: IgdbResponseItem): Game {
  return {
    id: item.id,
    title: item.name,
    price: item.price ?? 19.99,
    description: item.summary,
    story: item.storyline,
    coverImage: formatImageUrl(item.coverUrl),
    images: item.screenshots?.map(formatImageUrl) ?? [],
    heroVideo: item.videos?.[0],
    trailerVideo: item.videos?.[0],
    genres: item.genres,
    systemRequirementsMin: "OS: Windows 10, RAM: 8GB, GPU: GTX 960 or equivalent, Storage: 50GB",
    systemRequirementsRecommended: "OS: Windows 10/11, RAM: 16GB, GPU: GTX 1060 / AMD RX 580 or better, Storage: 50GB",
    features: ["Single Player", "Achievements", "Cloud Saves"],
  };
}

export async function fetchIgdbGames(name?: string, limit: number = 20): Promise<Game[]> {
  const params = {
    name: name?.trim() ? name : undefined,
    limit,
  };

  const queryString = buildQueryString(params);
  const url = queryString ? `${IGDB_BASE_URL}/games?${queryString}` : `${IGDB_BASE_URL}/games`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load IGDB games: ${response.statusText}`);
  }

  const igdbResults = (await response.json()) as IgdbResponseItem[];
  return igdbResults.map(mapIgdbResponseToGame);
}

export async function fetchGameById(gameId: number): Promise<Game> {
  const url = `${BASE_URL}/${gameId}`;
  console.log("Fetching from URL:", url);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);
      throw new Error(`Failed to load game: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json() as Game;
    console.log("✅ Game fetched:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Fetch error:", error);
    if (error.name === 'AbortError') {
      throw new Error("Request timeout - the server is taking too long to respond");
    }
    throw error;
  }
}

export function formatImageUrl(image?: string): string {
  if (!image) {
    return 'https://via.placeholder.com/300x400?text=No+Image';
  }

  let normalizedImage = image;

  if (normalizedImage.startsWith('//')) {
    normalizedImage = `https:${normalizedImage}`;
  }

  if (normalizedImage.startsWith('/')) {
    normalizedImage = `https:${normalizedImage}`;
  }

  if (normalizedImage.includes('images.igdb.com/igdb/image/upload/')) {
    normalizedImage = normalizedImage.replace(/\/t_[^/]+\//, '/t_1080p/');
  }

  return normalizedImage.startsWith('http') ? normalizedImage : `${API_BASE_URL.replace('/api', '')}${normalizedImage}`;
}
