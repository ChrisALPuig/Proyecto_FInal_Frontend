/**
 * API Configuration
 * Automatically determines the API base URL based on the environment
 */

const getApiBaseUrl = (): string => {
  // En desarrollo (localhost)
  if (import.meta.env.DEV) {
    return 'http://localhost:8080/api';
  }
  
  // En producción
  return 'https://chestgames.onrender.com/api';
};

const getAuthBaseUrl = (): string => {
  // En desarrollo (localhost)
  if (import.meta.env.DEV) {
    return 'http://localhost:8080/auth';
  }
  
  // En producción
  return 'https://chestgames.onrender.com/auth';
};

export const API_BASE_URL = getApiBaseUrl();
export const AUTH_BASE_URL = getAuthBaseUrl();

// URLs específicas por servicio
export const API_ENDPOINTS = {
  GAMES: `${API_BASE_URL}/games`,
  IGDB: `${API_BASE_URL}/igdb`,
  TICKETS: `${API_BASE_URL}/tickets`,
  USER: `${API_BASE_URL}/user`,
  TWO_FA: `${API_BASE_URL}/2fa`,
  WISHLIST: `${API_BASE_URL}/wishlist`,
  CART: `${API_BASE_URL}/cart`,
  PAYMENTS: `${API_BASE_URL}/payments`,
  DOWNLOADS: `${API_BASE_URL}/downloads`,
} as const;

export const AUTH_ENDPOINTS = {
  LOGIN: `${AUTH_BASE_URL}/login`,
  REGISTER: `${AUTH_BASE_URL}/register`,
  LOGIN_VERIFY: `${AUTH_BASE_URL}/login/verify`,
} as const;

export default API_BASE_URL;
