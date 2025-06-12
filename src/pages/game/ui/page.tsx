import { Box, Button, Typography, Modal } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore, Board, FigureIcon } from '$features/game';

const modaStyle = {
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

function GameHeader() {
  const usersNames = useGameStore(useShallow((state) => state.users));
  const turn = useGameStore(useShallow((state) => state.turn));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pt: '15px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '5px', '&>svg': { width: '24px' } }}>
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
        <Box sx={modaStyle}>
          <Typography>{usersNames[winner!]} won</Typography>
          <Button onClick={restart}>Restart</Button>
        </Box>
      </Modal>
    </Box>
  );
}
