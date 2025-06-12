import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouterState } from '$shared/lib/router';
import { Board, useGameStore } from '$features/game';
import { useShallow } from 'zustand/react/shallow';

function Header() {
  const { setScreen } = useRouterState();
  const usersNames = useGameStore(useShallow((state) => state.users));

  const goHome = () => {
    useGameStore.getState().exitGame();
    setScreen('home');
  };

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
      <Button onClick={goHome}>Go Home</Button>
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
