import { Board } from '$features/game';
import { Header } from '../Header';
import { GamePageLayout } from '$shared/ui/GamePageLayout';

export function GameReviewPage() {
  return <GamePageLayout header={<Header />} board={<Board readonly />} />;
}
