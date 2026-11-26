import './HomePage.css';
import ProductCard from '../components/ProductCart/ProductCard';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero секция */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              TochnoStore
              <span className="hero-subtitle">Точность в каждой детали</span>
            </h1>
            <p className="hero-description">
              Интернет-магазин с умной фильтрацией для точного подбора товаров
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">Перейти в каталог</button>
              <button className="btn btn-secondary">Узнать больше</button>
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Популярные категории</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">💻</div>
              <h3 className="category-name">Ноутбуки</h3>
              <p className="category-count">150+ товаров</p>
            </div>
            <div className="category-card">
              <div className="category-icon">📱</div>
              <h3 className="category-name">Смартфоны</h3>
              <p className="category-count">200+ товаров</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🎧</div>
              <h3 className="category-name">Аудио</h3>
              <p className="category-count">80+ товаров</p>
            </div>
            <div className="category-card">
              <div className="category-icon">⌚</div>
              <h3 className="category-name">Часы</h3>
              <p className="category-count">60+ товаров</p>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Почему TochnoStore?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Умная фильтрация</h3>
              <p className="feature-description">
                Динамические фильтры подстраиваются под ваши требования
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Быстрый поиск</h3>
              <p className="feature-description">
                Находите нужные товары за секунды
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Точный подбор</h3>
              <p className="feature-description">
                Множество характеристик для идеального выбора
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className="feature-title">Быстрая доставка</h3>
              <p className="feature-description">
                Доставляем по всей России в кратчайшие сроки
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Новые поступления */}
      <section className="new-arrivals-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Новые поступления</h2>
            <button className="btn btn-secondary">Смотреть все</button>
          </div>
        <div className="products-grid">
          {[
            {   id: 1, 
                name: 'MacBook Pro 16"', 
                category: 'Ноутбуки', price: 249990, 
                badge: 'Новинка' 
            },
            {   id: 2, 
                name: 'iPhone 15 Pro', 
                category: 'Смартфоны', 
                price: 129990, 
                badge: 'Хит' 
            },
            {    id: 3,
                 name: 'AirPods Pro 2', 
                 category: 'Аудио', 
                 price: 24990 },
            { 
                id: 4, 
                name: 'Apple Watch Ultra', 
                category: 'Часы', 
                price: 76490, 
                oldPrice: 89990 
            },
          ].map((p) => (
    <ProductCard key={p.id} product={p} />
          ))}
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">TochnoStore</h3>
              <p className="footer-description">
                Точность в каждой детали. Умная фильтрация для точного подбора товаров.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-subtitle">Каталог</h4>
              <ul className="footer-links">
                <li><a href="/catalog">Все категории</a></li>
                <li><a href="/catalog">Новинки</a></li>
                <li><a href="/catalog">Акции</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-subtitle">Информация</h4>
              <ul className="footer-links">
                <li><a href="/about">О компании</a></li>
                <li><a href="/delivery">Доставка</a></li>
                <li><a href="/contacts">Контакты</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-subtitle">Контакты</h4>
              <ul className="footer-contacts">
                <li>📞 8 (800) 123-45-67</li>
                <li>✉️ info@tochnostore.ru</li>
                <li>📍 г. Томск, ул. Примерная, 1</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 TochnoStore. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;