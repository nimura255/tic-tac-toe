import { Box, Typography } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore, Board } from '$features/game';

export function GamePage() {
  const usersNames = useGameStore(useShallow((state) => state.users));
  const turn = useGameStore(useShallow((state) => state.turn));

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
      <Typography variant="h5" sx={{ textAlign: 'center', pt: '15px' }}>
        {usersNames[turn]}'s turn
      </Typography>
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
    </Box>
  );
}
