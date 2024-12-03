import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;