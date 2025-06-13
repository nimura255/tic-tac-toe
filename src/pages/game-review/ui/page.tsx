import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useScreenStore } from '$shared/lib/router';
import { Board, useGameStore, exitGame } from '$features/game';
import { useShallow } from 'zustand/react/shallow';

function goHome() {
  exitGame();
  useScreenStore.getState().setScreen('history');
}

function Header() {
  const usersNames = useGameStore(useShallow((state) => state.users));

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
      <Button onClick={goHome}>Go back</Button>
      <Typography variant="h5" sx={{ justifySelf: 'center' }}>
        {usersNames.circles} vs {usersNames.crosses}
      </Typography>
    </Box>
  );
}

export function GameReviewPage() {
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
      <Header />
      <Box
        sx={{
          padding: '15px',
          boxSizing: 'border-box',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Board readonly />
      </Box>
    </Box>
  );
}
