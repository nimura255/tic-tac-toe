import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { GamePage } from '$pages/game';
import { GameReviewPage } from '$pages/gameReview';
import { HistoryPage } from '$pages/history';
import { HomePage } from '$pages/home';
import { StartPvpPage } from '$pages/startPvp';
import { useScreenStore } from '$shared/lib/router';

import './ui/main.css';

export function App() {
  const { screen } = useScreenStore();

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
    <App />
  </StrictMode>,
);
