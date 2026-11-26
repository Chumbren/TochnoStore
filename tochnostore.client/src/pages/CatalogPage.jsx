import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useCatalog } from '../hooks/useCatalog';
import ProductCard from '../components/ProductCart/ProductCard';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import Pagination from '../components/Pagination/Pagination';
import './CatalogPage.css';

const PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price_asc', label: 'Сначала дешёвые' },
  { value: 'price_desc', label: 'Сначала дорогие' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'new', label: 'Новинки' },
];

const CatalogPage = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Восстанавливаем фильтры из URL
  const initialFilters = useMemo(() => {
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (['category_id', 'page', 'sort_by', 'per_page'].includes(key)) continue;
      if (value.includes(',')) {
        filters[key] = value.split(',').map(Number);
      } else if (!isNaN(Number(value))) {
        filters[key] = Number(value);
      } else {
        filters[key] = value;
      }
    }
    return filters;
  }, []);

  const {
    products,
    filters,
    activeFilters,
    loading,
    pagination,
    updateFilter,
    resetFilters,
    setPage,
  } = useCatalog(categoryId, initialFilters);

  const sortBy = searchParams.get('sort_by') || 'popular';
  const currentPage = Number(searchParams.get('page')) || 1;

  // Синхронизация фильтров с URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (categoryId) params.set('category_id', categoryId);
    if (sortBy !== 'popular') params.set('sort_by', sortBy);
    if (currentPage > 1) params.set('page', String(currentPage));

    Object.entries(activeFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });

    setSearchParams(params, { replace: true });
  }, [categoryId, activeFilters, sortBy, currentPage, setSearchParams]);

  const handleSortChange = (e) => {
    setSearchParams((prev) => {
      prev.set('sort_by', e.target.value);
      prev.delete('page');
      return prev;
    });
  };

  const handleFilterChange = (key, value) => {
    updateFilter(key, value);
    setSearchParams((prev) => {
      prev.delete('page');
      return prev;
    });
  };

  const handleReset = () => {
    resetFilters();
    setSearchParams({ sort_by: sortBy });
  };

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Активные фильтры — чипы
  const activeFilterChips = Object.entries(activeFilters).filter(
    ([, value]) => value !== undefined && value !== null && value !== ''
  );

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Хлебные крошки */}
        <nav className="breadcrumbs" aria-label="Хлебные крошки">
          <Link to="/" className="breadcrumbs__link">
            Главная
          </Link>
          <span className="breadcrumbs__separator">/</span>
          <Link to="/catalog" className="breadcrumbs__link">
            Каталог
          </Link>
          {categoryId && (
            <>
              <span className="breadcrumbs__separator">/</span>
              <span className="breadcrumbs__current">
                Категория #{categoryId}
              </span>
            </>
          )}
        </nav>

        <h1 className="catalog-page__title">Каталог</h1>

        <div className="catalog-page__layout">
          {/* Мобильная кнопка */}
          <button
            className="btn btn-secondary catalog-page__filter-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            🔍 Фильтры
          </button>

          {/* Сайдбар */}
          <div
            className={`catalog-page__sidebar ${
              sidebarOpen ? 'catalog-page__sidebar--open' : ''
            }`}
          >
            {sidebarOpen && (
              <div
                className="catalog-page__overlay"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <FilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onChange={handleFilterChange}
              onReset={handleReset}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Контент */}
          <div className="catalog-page__content">
            {/* Тулбар */}
            <div className="catalog-toolbar">
              <div className="catalog-toolbar__info">
                Найдено: <strong>{pagination.total}</strong> товаров
              </div>

              <div className="catalog-toolbar__controls">
                <select
                  className="select catalog-toolbar__sort"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Активные фильтры */}
            {activeFilterChips.length > 0 && (
              <div className="active-filters">
                {activeFilterChips.map(([key, value]) => (
                  <span key={key} className="active-filters__chip">
                    {key}: {Array.isArray(value) ? value.join(', ') : value}
                    <button
                      className="active-filters__remove"
                      onClick={() => handleFilterChange(key, undefined)}
                      aria-label={`Убрать фильтр ${key}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Сетка товаров */}
            {loading ? (
              <div className="catalog-page__loading">
                <div className="spinner" />
                <p>Загрузка товаров...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="catalog-page__empty">
                <div className="catalog-page__empty-icon">🔍</div>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить параметры фильтрации</p>
                <button className="btn btn-primary" onClick={handleReset}>
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  page={currentPage}
                  total={pagination.total}
                  perPage={PER_PAGE}
                  onChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;