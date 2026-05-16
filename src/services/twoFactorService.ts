import { API_ENDPOINTS, AUTH_ENDPOINTS } from '../config/apiConfig';

export const generate2FAQR = async (token: string) => {
  const response = await fetch(`${API_ENDPOINTS.TWO_FA}/setup`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error generando QR de 2FA');
  }

  return response.json();
};

export const verify2FACode = async (token: string, code: string) => {
  const response = await fetch(`${API_ENDPOINTS.TWO_FA}/verify`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: new URLSearchParams({ code }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Código inválido');
  }

  return response.text();
};

export const disable2FA = async (token: string, code: string) => {
  const response = await fetch(`${API_ENDPOINTS.TWO_FA}/disable`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: new URLSearchParams({ code }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error desactivando 2FA');
  }

  return response.text();
};

export const get2FAStatus = async (token: string) => {
  const response = await fetch(`${API_ENDPOINTS.TWO_FA}/status`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error obteniendo estado de 2FA');
  }

  return response.json();
};

export const verifyLogin2FA = async (verification: { email?: string; username?: string; code: string }) => {
  const response = await fetch(`${AUTH_ENDPOINTS.LOGIN_VERIFY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(verification),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error verificando el código 2FA');
  }

  return response.json();
};
