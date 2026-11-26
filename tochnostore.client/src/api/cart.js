import apiClient from './axios';

export const cartAPI = {
  getCart: () => apiClient.get('/v1/cart'),
  addItem: (payload) => apiClient.post('/v1/cart/items', payload),
  updateItem: (itemId, payload) =>
    apiClient.put(`/v1/cart/items/${itemId}`, payload),
  removeItem: (itemId) => apiClient.delete(`/v1/cart/items/${itemId}`),
  clearCart: () => apiClient.delete('/v1/cart'),
  applyPromo: (code) => apiClient.post('/v1/cart/promo', { code }),
};