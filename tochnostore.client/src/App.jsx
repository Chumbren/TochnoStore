import { RouterProvider } from 'react-router-dom';
import { router } from './routers'

// Базовые стили
import './assets/css/reset.css';
import './assets/css/variables.css';
import './assets/css/base.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;