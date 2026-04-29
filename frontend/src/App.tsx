import { Routes, Route, NavLink } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ItemsPage } from './pages/ItemsPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { BriefComposePage } from './pages/BriefComposePage';
import { BriefConfirmPage } from './pages/BriefConfirmPage';
import { BriefSuccessPage } from './pages/BriefSuccessPage';
import { PublicBriefPage } from './pages/PublicBriefPage';

function linkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link';
}

export function App() {
  return (
    <div className="app-shell app-shell--brieflink">
      <header className="app-header">
        <div className="app-header__inner">
          <div>
            <p className="eyebrow">BriefLink</p>
            <h1 className="app-title">Calm prototype shell</h1>
          </div>
          <nav className="app-nav" aria-label="Primary">
            <NavLink to="/briefs/new" className={linkClassName}>
              Create brief
            </NavLink>
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
          <Route path="/briefs/new" element={<BriefComposePage />} />
          <Route path="/briefs/:slug/confirm" element={<BriefConfirmPage />} />
          <Route path="/briefs/:slug/success" element={<BriefSuccessPage />} />
          <Route path="/b/:slug" element={<PublicBriefPage />} />
        </Routes>
      </main>
    </div>
  );
}