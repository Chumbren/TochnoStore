import { useState } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, activeFilters, onChange, onReset, onClose }) => {
  // filters — объект вида:
  // {
  //   price: { min: 0, max: 300000 },
  //   brands: [{ id: 1, name: 'Apple', count: 15 }, ...],
  //   attributes: [
  //     { key: 'ram', name: 'ОЗУ', type: 'checkbox', options: [...] },
  //     { key: 'screen', name: 'Экран', type: 'select', options: [...] },
  //   ]
  // }

  const [priceRange, setPriceRange] = useState({
    min: activeFilters.price_min ?? filters.price?.min ?? 0,
    max: activeFilters.price_max ?? filters.price?.max ?? 0,
  });

  const handleCheckboxChange = (key, optionId) => {
    const current = activeFilters[key] || [];
    const next = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    onChange(key, next.length ? next : undefined);
  };

  const handlePriceApply = () => {
    onChange('price_min', priceRange.min || undefined);
    onChange('price_max', priceRange.max || undefined);
  };

  const isChecked = (key, optionId) =>
    (activeFilters[key] || []).includes(optionId);

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <h3 className="filter-sidebar__title">Фильтры</h3>
        <button
          className="filter-sidebar__close"
          onClick={onClose}
          aria-label="Закрыть фильтры"
        >
          ✕
        </button>
      </div>

      {hasActiveFilters && (
        <button className="filter-sidebar__reset" onClick={onReset}>
          Сбросить все фильтры
        </button>
      )}

      {/* Цена */}
      {filters.price && (
        <div className="filter-group">
          <h4 className="filter-group__title">Цена, ₽</h4>
          <div className="filter-group__price">
            <input
              type="number"
              className="input"
              placeholder="От"
              value={priceRange.min || ''}
              min={filters.price.min}
              max={filters.price.max}
              onChange={(e) =>
                setPriceRange((p) => ({ ...p, min: Number(e.target.value) }))
              }
            />
            <input
              type="number"
              className="input"
              placeholder="До"
              value={priceRange.max || ''}
              min={filters.price.min}
              max={filters.price.max}
              onChange={(e) =>
                setPriceRange((p) => ({ ...p, max: Number(e.target.value) }))
              }
            />
          </div>
          <button
            className="btn btn-secondary filter-group__apply"
            onClick={handlePriceApply}
          >
            Применить
          </button>
        </div>
      )}

      {/* Бренды */}
      {filters.brands?.length > 0 && (
        <div className="filter-group">
          <h4 className="filter-group__title">Бренд</h4>
          <ul className="filter-group__list">
            {filters.brands.map((brand) => (
              <li key={brand.id} className="filter-option">
                <label className="filter-option__label">
                  <input
                    type="checkbox"
                    className="filter-option__input"
                    checked={isChecked('brand_ids', brand.id)}
                    onChange={() => handleCheckboxChange('brand_ids', brand.id)}
                  />
                  <span className="filter-option__text">{brand.name}</span>
                  <span className="filter-option__count">{brand.count}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Динамические атрибуты */}
      {filters.attributes?.map((attr) => (
        <div key={attr.key} className="filter-group">
          <h4 className="filter-group__title">{attr.name}</h4>

          {attr.type === 'checkbox' && (
            <ul className="filter-group__list">
              {attr.options.map((opt) => (
                <li key={opt.id} className="filter-option">
                  <label className="filter-option__label">
                    <input
                      type="checkbox"
                      className="filter-option__input"
                      checked={isChecked(attr.key, opt.id)}
                      onChange={() => handleCheckboxChange(attr.key, opt.id)}
                    />
                    <span className="filter-option__text">{opt.value}</span>
                    <span className="filter-option__count">{opt.count}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}

          {attr.type === 'select' && (
            <select
              className="select"
              value={activeFilters[attr.key] || ''}
              onChange={(e) => onChange(attr.key, e.target.value || undefined)}
            >
              <option value="">Все</option>
              {attr.options.map((opt) => (
                <option key={opt.id} value={opt.value}>
                  {opt.value} ({opt.count})
                </option>
              ))}
            </select>
          )}

          {attr.type === 'radio' && (
            <ul className="filter-group__list">
              {attr.options.map((opt) => (
                <li key={opt.id} className="filter-option">
                  <label className="filter-option__label">
                    <input
                      type="radio"
                      name={attr.key}
                      className="filter-option__input"
                      checked={activeFilters[attr.key] === opt.value}
                      onChange={() => onChange(attr.key, opt.value)}
                    />
                    <span className="filter-option__text">{opt.value}</span>
                    <span className="filter-option__count">{opt.count}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar;