import { useState, useEffect, useCallback } from 'react';
import { catalogAPI } from '../api';

export const useCatalog = (categoryId, initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, total: 0 });

  // Загрузка доступных фильтров
  const loadFilters = useCallback(async () => {
    if (!categoryId) return;
    try {
      const { data } = await catalogAPI.getFilters(categoryId, activeFilters);
      setFilters(data);
    } catch (err) {
      console.error('Ошибка загрузки фильтров:', err);
    }
  }, [categoryId, activeFilters]);

  // Загрузка товаров
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        category_id: categoryId,
        page: pagination.page,
        ...activeFilters,
      };
      const { data } = await catalogAPI.getProducts(params);
      setProducts(data.items || []);
      setPagination((prev) => ({ ...prev, total: data.total || 0 }));
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId, activeFilters, pagination.page]);

  useEffect(() => {
    loadFilters();
    loadProducts();
  }, [categoryId, activeFilters, pagination.page]);

  const updateFilter = (key, value) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const resetFilters = () => {
    setActiveFilters({});
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    products,
    filters,
    activeFilters,
    loading,
    pagination,
    updateFilter,
    resetFilters,
    setPage: (page) => setPagination((prev) => ({ ...prev, page })),
  };
};