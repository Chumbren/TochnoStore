import apiClient from './axios';

export const catalogAPI = {
  getCategories: () => apiClient.get('/v1/catalog/categories'),
  getCategory: (id) => apiClient.get(`/v1/catalog/categories/${id}`),

  // Умная фильтрация: возвращает доступные фильтры и счётчики
  getFilters: (categoryId, currentFilters = {}) =>
    apiClient.get(`/v1/catalog/filters`, {
      params: { category_id: categoryId, ...currentFilters },
    }),

  // Получение товаров с динамическими фильтрами
  getProducts: (params) => apiClient.get('/v1/catalog/products', { params }),

  getProduct: (id) => apiClient.get(`/v1/catalog/products/${id}`),
  getProductReviews: (id, params) =>
    apiClient.get(`/v1/catalog/products/${id}/reviews`, { params }),
  addProductReview: (id, payload) =>
    apiClient.post(`/v1/catalog/products/${id}/reviews`, payload),
};