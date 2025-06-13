import { useEffect } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore, Board, FigureIcon } from '$features/game';
import { useHistoryStore } from '$features/history';
import { useScreenStore } from '$shared/lib/router';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function exitGame() {
  useGameStore.getState().exitGame();
  useScreenStore.getState().setScreen('home');
}

function GameHeader() {
  const usersNames = useGameStore(useShallow((state) => state.users));
  const turn = useGameStore(useShallow((state) => state.turn));

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        alignItems: 'center',
        justifyItems: 'start',
        pt: '15px',
        px: '15px',
      }}
    >
      <Button onClick={exitGame}>Exit</Button>
      <Box
        sx={{
          display: 'flex',
          gap: '5px',
          justifySelf: 'center',
          '&>svg': { width: '24px' },
        }}
      >
        <FigureIcon type={turn} />
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {usersNames[turn]}'s turn
        </Typography>
      </Box>
    </Box>
  );
}

export function GamePage() {
  const usersNames = useGameStore(useShallow((state) => state.users));
  const winner = useGameStore(useShallow((state) => state.winner));
  const restart = useGameStore(useShallow((state) => state.restart));

  useEffect(() => {
    const unsubscribe = useGameStore.subscribe(
      (state) => state.winner,
      (winner) => {
        if (!winner) {
          return;
        }

        const currentGameState = useGameStore.getState();

        useHistoryStore.getState().addToHistory({
          userNames: currentGameState.users,
          winner: currentGameState.winner!,
          board: currentGameState.board,
          endgameSequence: currentGameState.endgameSequence!,
        });
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <GameHeader />
      <Box
        sx={{
          padding: '15px',
          boxSizing: 'border-box',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Board />
      </Box>
      <Modal open={Boolean(winner)}>
        <Box sx={modalStyle}>
          <Typography>{usersNames[winner!]} won</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button onClick={restart} variant="contained">
              Restart
            </Button>
            <Button onClick={exitGame} variant="contained">
              Exit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
