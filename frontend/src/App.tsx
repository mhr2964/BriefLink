import { Routes, Route, NavLink } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ItemsPage } from './pages/ItemsPage';
import { ItemDetailPage } from './pages/ItemDetailPage';

function linkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link';
}

export function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <div>
            <p className="eyebrow">BriefLink</p>
            <h1 className="app-title">Calm prototype shell</h1>
          </div>
          <nav className="app-nav" aria-label="Primary">
            <NavLink to="/" end className={linkClassName}>
              Home
            </NavLink>
            <NavLink to="/items" className={linkClassName}>
              Items
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:itemId" element={<ItemDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}