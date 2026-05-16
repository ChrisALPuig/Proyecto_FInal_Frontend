import { API_ENDPOINTS, AUTH_ENDPOINTS } from '../config/apiConfig';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  country: string;
  currency: string;
  language: string;
  avatar?: string;
  roles: string[];
  createdAt?: string;
  token?: string;
}

export interface UserProfileUpdate {
  username: string;
  avatar?: string;
  phoneNumber: string;
  birthDate: string;
  country: string;
  currency: string;
  language: string;
}

export const getUserProfile = async (token: string) => {
  const response = await fetch(`${API_ENDPOINTS.USER}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load user profile');
  }

  return response.json() as Promise<UserProfile>;
};

export const updateUserProfile = async (token: string, data: UserProfileUpdate) => {
  const response = await fetch(`${API_ENDPOINTS.USER}/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }

  return response.json() as Promise<UserProfile>;
};

export interface ChangeEmailRequest {
  currentPassword: string;
  newEmail: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const changeEmail = async (token: string, data: ChangeEmailRequest) => {
  const response = await fetch(`${API_ENDPOINTS.USER}/change-email`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to change email');
  }

  return response.json() as Promise<UserProfile>;
};

export const changePassword = async (token: string, data: ChangePasswordRequest) => {
  const response = await fetch(`${API_ENDPOINTS.USER}/change-password`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to change password');
  }

  return response.json() as Promise<UserProfile>;
};

export interface DeleteAccountRequest {
  password: string;
}

export const deleteAccount = async (token: string, data: DeleteAccountRequest) => {
  const response = await fetch(`${API_ENDPOINTS.USER}/delete-account`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to delete account');
  }
};

export interface ForgotPasswordRequest {
  email: string;
}

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  const response = await fetch(`${AUTH_ENDPOINTS.LOGIN}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to send recovery email');
  }

  return response.text();
};

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await fetch(`${AUTH_ENDPOINTS.LOGIN}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to reset password');
  }

  return response.text();
};
