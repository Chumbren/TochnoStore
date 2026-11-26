import apiClient from './axios';

export const authAPI = {
  register: (payload) => apiClient.post('/v1/auth/register', payload),
  login: (credentials) => apiClient.post('/v1/auth/login', credentials),
  refresh: (refreshToken) => apiClient.post('/v1/auth/refresh', { refreshToken }),
  logout: () => apiClient.post('/v1/auth/logout'),
};