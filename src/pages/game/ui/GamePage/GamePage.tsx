import { useEffect } from 'react';

import { useGameStore, markGameEnd, Board } from '$features/game';
import { addToHistory } from '$features/history';
import { GamePageLayout } from '$shared/ui/GamePageLayout';

import { GameHeader } from '../GameHeader';
import { GameOverModal } from '../GameOverModal';

export function GamePage() {
  useEffect(() => {
    const unsubscribe = markGameEnd.subscribe(() => {
      const currentGameState = useGameStore.getState();

      addToHistory({
        userNames: currentGameState.users,
        winner: currentGameState.winner!,
        board: currentGameState.board,
        endgameSequence: currentGameState.endgameSequence!,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <GamePageLayout header={<GameHeader />} board={<Board />} />
      <GameOverModal />
    </>
  );
}
