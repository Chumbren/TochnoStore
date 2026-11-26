import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';

const Placeholder = ({ name }) => (
  <div style={{ color: '#e5e7eb', padding: '2rem' }}>{name}</div>
);

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/catalog', element: <CatalogPage /> },
  { path: '/catalog/:categoryId', element: <CatalogPage /> },
  { path: '/product/:id', element: <Placeholder name="Карточка товара" /> },
  { path: '/cart', element: <Placeholder name="Корзина" /> },
  { path: '/checkout', element: <Placeholder name="Оформление заказа" /> },
  { path: '/orders', element: <Placeholder name="Мои заказы" /> },
  { path: '/orders/:id', element: <Placeholder name="Детали заказа" /> },
  { path: '/profile', element: <Placeholder name="Личный кабинет" /> },
  { path: '/profile/addresses', element: <Placeholder name="Адреса доставки" /> },
  { path: '/profile/favorites', element: <Placeholder name="Избранное" /> },
  { path: '/login', element: <Placeholder name="Вход" /> },
  { path: '/register', element: <Placeholder name="Регистрация" /> },
  { path: '*', element: <Placeholder name="404 — Страница не найдена" /> },
]);