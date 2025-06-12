import { GamePage } from '$pages/game';
import { HistoryPage } from '$pages/history';
import { HomePage } from '$pages/home';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterContextProvider, useRouterState } from '$shared/lib/router';
import { GameReviewPage } from '$pages/game-review';
import { StartPvpPage } from '$pages/start-pvp';
import './ui/main.css';

export function App() {
  const { screen } = useRouterState();

  switch (screen) {
    case 'game':
      return <GamePage />;
    case 'history':
      return <HistoryPage />;
    case 'game-review':
      return <GameReviewPage />;
    case 'start-pvp':
      return <StartPvpPage />;
    case 'home':
    default:
      return <HomePage />;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterContextProvider>
      <App />
    </RouterContextProvider>
  </StrictMode>,
);
