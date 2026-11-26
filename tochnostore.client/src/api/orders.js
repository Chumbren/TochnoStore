import apiClient from './axios';

export const ordersAPI = {
  create: (payload) => apiClient.post('/v1/orders', payload),
  getAll: (params) => apiClient.get('/v1/orders', { params }),
  getById: (id) => apiClient.get(`/v1/orders/${id}`),
  cancel: (id) => apiClient.post(`/v1/orders/${id}/cancel`),
};